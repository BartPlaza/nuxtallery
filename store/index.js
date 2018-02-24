import Vuex from 'vuex';
import axios from 'axios';

const createStore = function(){
	return new Vuex.Store({
		state:{
			user: null,
			images: []
		},
		getters:{
			isAuthenticated: function(state){
				return state.user != null;
			},
			loadedImages: function(state){
				return state.images;
			},
			showImage: function(state){
				return function(id){
					return state.images.find(function(img){
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
			},
			setImages: function(state, images){
				state.images = images
			},
			saveImage: function(state, image){
				state.images.push(image);
			},
			deleteImage: function(state, id){
				state.images.forEach(function(item, index){
					if(item.id == id){
						state.images.splice(index, 1);
					}
				});
			}
		},
		actions:{
			nuxtServerInit(VuexContext, context){
				return axios.get('https://nuxtallery.firebaseio.com/images.json')
				.then(function(response){
					const images = [];
					for(const key in response.data){
						images.push({...response.data[key], id: key});
					}
					VuexContext.commit('setImages', images);
				})
				.catch(function(error){
					context.error(error);
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