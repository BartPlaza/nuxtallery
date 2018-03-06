import firebase from 'firebase';

export default{
	state: {
		images: []
	},
	getters: {
		publicImages: function(state){
			return state.images.filter(function(image){
				return image.private == false; 
			});
		},
		userPublicImages: function(state){
			return function(userId){
				return state.images.filter(function(image){
					return ((image.userId == userId) && (image.private == false));
				});
			}
		},
		userPrivateImages: function(state){
			return function(userId){
				return state.images.filter(function(image){
					return ((image.userId == userId) && (image.private == true)); 
				});
			}
		},
		showImage: function(state){
			return function(id){
				return state.images.find(function(img){
					return img.id == id;
				})
			}
		}
	},
	mutations: {
		setPublicImages: function(state, images){
			state.images = images;
		},
		setPrivateImages: function(state, images){
			state.images = state.images.concat(images);
		},
		clearPrivateImages: function(state){
			for (let i=state.images.length-1; i>=0; i--){
				if(state.images[i].private == true){
					state.images.splice(i, 1);
				}
			}
		},
		saveImage: function(state, image){
			state.images.push(image);
		},
		deleteImage: function(state, id){
			let index = state.images.findIndex(function(image){
				return image.id == imageId;
			});
			state.images[index].splice(index, 1);
		},
		addLike: function(state, {imageId, userId}){
			let index = state.images.findIndex(function(image){
				return image.id == imageId;
			});
			state.images[index].likes.push(userId);
		}
	},
	actions: {
		nuxtServerInit(VuexContext, context){
			return firebase.database().ref('images').orderByChild('private').equalTo(false).once('value')
			.then(function(response){
				console.log(response.val());
				const images = [];
				const data = response.val();
				for(const key in data){
					if(data[key].likes === undefined){
						images.push({...data[key], id: key, likes: []});
					} else {
						images.push({...data[key], id: key});
					}
				}
				VuexContext.commit('setPublicImages', images);
			})
			.catch(function(error){
				context.error(error);
			});
		},
		setPrivateImages(VuexContext, userId){
			firebase.database().ref('images').orderByChild('userId').equalTo(userId).once('value')
			.then(function(response){
				const images = [];
				const data = response.val();

				for(const key in data){
					if(data[key].private == true){
						if(data[key].likes === undefined){
							images.push({...data[key], id: key, likes: []});
						} else {
							images.push({...data[key], id: key});
						}
					}
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
			let reference = firebase.database().ref('images/'+imageId+'/likes');
			reference.transaction(function(data){
				if(data === null){
					return [VuexContext.rootGetters.getUserId];
				}else {
					let newdata = data;
					newdata.push(VuexContext.rootGetters.getUserId);
					return newdata;
				}
			})
			.then(function(response){
				VuexContext.commit('addLike', {imageId, userId: VuexContext.rootGetters.getUserId});
			})
			.catch(function(error){
				console.log(error);
			});
		}
	}
}