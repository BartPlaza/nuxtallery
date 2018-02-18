import Vuex from 'vuex';
import axios from 'axios';

const createStore = function(){
	return new Vuex.Store({
		state:{
			images: []
		},
		getters:{
			loadedImages: function(state){
				return state.images
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
			saveImage(context, image){
				axios.post('https://nuxtallery.firebaseio.com/images.json', image)
				.then(function(response){
					const fullImage = {...image, id: response.data.name};
					context.commit('saveImage', fullImage);
				})
				.catch(function(error){
					context.error(error);
				});
			},
			deleteImage(context, id){
				axios.delete('https://nuxtallery.firebaseio.com/images/'+id+'.json')
				.then(function(response){
					context.commit('deleteImage', id);
				})
				.catch(function(error){
					context.error(error);
				});
			}
		}
	});
}
export default createStore;