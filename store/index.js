import Vuex from 'vuex';
import axios from 'axios';

const createStore = function(){
	return new Vuex.Store({
		state:{
			user: null,
			publicImages: [],
			privateImages: []
		},
		getters:{
			isAuthenticated: function(state){
				return state.user != null;
			},
			getUserId: function(state){
				if(state.user != null){
					return state.user.localId;
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
			}
		},
		mutations:{
			logInUser: function(state, user){
				state.user = user;
			},
			logOutUser: function(state){
				state.user = null;
				state.privateImages = [];
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
				return axios.get('https://nuxtallery.firebaseio.com/images.json?orderBy="private"&equalTo=false')
				.then(function(response){
					const images = [];
					for(const key in response.data){
						images.push({...response.data[key], id: key});
					}
					VuexContext.commit('setPublicImages', images);
				})
				.catch(function(error){
					context.error(error);
				});
			},
			setPrivateImages(VuexContext, userId){
				axios.get('https://nuxtallery.firebaseio.com/images.json?orderBy="userId"&equalTo="'+userId+'"&auth='+VuexContext.state.user.idToken)
				.then(function(response){
					const images = [];
					for(const key in response.data){
						images.push({...response.data[key], id: key});
					}
					VuexContext.commit('setPrivateImages', images);
				})
				.catch(function(error){
					console.log(error.response);
				});
			},
			logOutTimer(VuexContext, time){
				setTimeout(function(){
					VuexContext.commit('logOutUser');
					localStorage.removeItem('authUser');
				},time);
			},
			saveImage(VuexContext, image){
				axios.post('https://nuxtallery.firebaseio.com/images.json?auth='+VuexContext.state.user.idToken, image)
				.then(function(response){
					const fullImage = {...image, id: response.data.name};
					VuexContext.commit('saveImage', fullImage);
				})
				.catch(function(error){
					console.log(error.response);
				});
			},
			deleteImage(VuexContext, id){
				axios.delete('https://nuxtallery.firebaseio.com/images/'+id+'.json?auth='+VuexContext.state.user.idToken)
				.then(function(response){
					VuexContext.commit('deleteImage', id);
				})
				.catch(function(error){
					console.log(error.response);
				});
			}
		}
	});
}
export default createStore;