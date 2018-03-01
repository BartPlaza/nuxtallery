import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase';

const createStore = function(){
	return new Vuex.Store({
		state:{
			user: null,
			publicImages: '',
			privateImages: [],
			formErrors: {
				show: false,
				message: ''
			}
		},
		getters:{
			isAuthenticated: function(state){
				return state.user != null;
			},
			getUserId: function(state){
				if(state.user != null){
					return state.user;
				}
			},
			publicImages: function(state){
				return state.publicImages;
			},
			privateImages: function(state){
				return state.privateImages;
			},
			showPublicImage: function(state){
				return function(id){
					return state.publicImages.find(function(img){
						return img.id == id;
					})
				}
			},
			showPrivateImage: function(state){
				return function(id){
					return state.privateImages.find(function(img){
						return img.id == id;
					})
				}
			},
			getFormErrors: function(state){
				return state.formErrors;
			}
		},
		mutations:{
			setUser: function(state, user){
				state.user = user.uid;
				this.dispatch('setPrivateImages', user.uid);
			},
			clearUser: function(state){
				state.user = null;
				state.privateImages = [];
			},
			setFormError: function(state, error){
				state.formErrors.show = true;
				state.formErrors.message = error;
			},
			clearFormError: function(state){
				state.formErrors.show = false;
				state.formErrors.message = '';
			},
			setPublicImages: function(state, images){
				state.publicImages = images;
			},
			setPrivateImages: function(state, images){
				state.privateImages = images;
			},
			saveImage: function(state, image){
				state.privateImages.push(image);
				if(!image.private){
					state.publicImages.push(image);
				}
			},
			deleteImage: function(state, id){
				state.privateImages.forEach(function(item, index){
					if(item.id == id){
						state.privateImages.splice(index, 1);
					}
				});
				state.publicImages.forEach(function(item, index){
					if(item.id == id){
						state.publicImages.splice(index, 1);
					}
				});
			}
		},
		actions:{
			nuxtServerInit(VuexContext, context){
				return firebase.database().ref('images').once('value')
				//return axios.get('https://nuxtallery.firebaseio.com/images.json?orderBy="private"&equalTo=false')
				.then(function(response){
					const images = [];
					const data = response.val();
					for(const key in data){
						images.push({...data[key], id: key});
					}
					VuexContext.commit('setPublicImages', images);
				})
				.catch(function(error){
					context.error(error);
				});
			},
			loginUser(VuexContext, credentials){
				const el = this;
				firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
				.then(function(response){
					VuexContext.commit('setUser',response);
					VuexContext.commit('clearFormError');
					el.$router.push('/admin');
				})
				.catch(function(error){
					VuexContext.commit('setFormError', error.message);
				});
			},
			registerUser(VuexContext, credentials){
				firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
				.then(function(response){
					VuexContext.commit('setUser',response);
					VuexContext.commit('clearFormError');
					el.$router.push('/admin');
				})
				.catch(function(error){
					VuexContext.commit('setFormError', error.message);
				});
			},
			logoutUser(VuexContext){
				const el = this;
				firebase.auth().signOut()
				.then(function(response){
					VuexContext.commit('clearUser');
					el.$router.push('/');
				})
				.catch(function(error){
					console.log(error);
				});
			},
			setPrivateImages(VuexContext, userId){
				//axios.get('https://nuxtallery.firebaseio.com/images.json?orderBy="userId"&equalTo="'+userId+'"&auth='+VuexContext.state.user.idToken)
				firebase.database().ref('images').orderByChild('userId').equalTo(userId).once('value')
				.then(function(response){
					const images = [];
					const data = response.val();
					for(const key in data){
						images.push({...data[key], id: key});
					}
					VuexContext.commit('setPrivateImages', images);
				})
				.catch(function(error){
					console.log(error.response);
				});
			},
			saveImage(VuexContext, image){
				//axios.post('https://nuxtallery.firebaseio.com/images.json?auth='+VuexContext.state.user.idToken, image)
				firebase.database().ref('images').push(image)
				.then(function(response){
					console.log(response);
					const fullImage = {...image, id: response.key};
					VuexContext.commit('saveImage', fullImage);
				})
				.catch(function(error){
					console.log(error.response);
				});
			},
			deleteImage(VuexContext, id){
				//axios.delete('https://nuxtallery.firebaseio.com/images/'+id+'.json?auth='+VuexContext.state.user.idToken)
				firebase.database().ref('images/'+id).remove()
				.then(function(response){
					VuexContext.commit('deleteImage', id);
				})
				.catch(function(error){
					console.log(error.response);
				});
			},
			addLike(VuexContext, imageId){
				let reference = firebase.database().ref('images/'+imageId+'/likes/count');
				reference.transaction(function(data){
					return data + 1;
				});
				reference = firebase.database().ref('images/'+imageId+'/likes/users');
				reference.transaction(function(data){
					if(data === null){
						return [VuexContext.state.user];
					}else {
						let newdata = data;
						newdata.push(VuexContext.state.user);
						return newdata;
					}
				});
			}
		}
	});
}
export default createStore;