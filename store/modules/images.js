import firebase from 'firebase';

export default{
	namespace: true,
	state: {
		publicImages: [],
		privateImages: []
	},
	getters: {
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
	mutations: {
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
	actions: {
		nuxtServerInit(VuexContext, context){
			return firebase.database().ref('images').once('value')
			//return axios.get('https://nuxtallery.firebaseio.com/images.json?orderBy="private"&equalTo=false')
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
			//axios.get('https://nuxtallery.firebaseio.com/images.json?orderBy="userId"&equalTo="'+userId+'"&auth='+VuexContext.state.user.idToken)
			firebase.database().ref('images').orderByChild('userId').equalTo(userId).once('value')
			.then(function(response){
				const images = [];
				const data = response.val();
				for(const key in data){
					if(data[key].likes === undefined){
						images.push({...data[key], id: key, likes: []});
					} else {
						images.push({...data[key], id: key});
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
			console.log('images/'+imageId+'/likes');
			reference.transaction(function(data){

				if(data === undefined){
					return [VuexContext.state.user];
				}else {
					let newdata = data;
					newdata.push(VuexContext.state.user);
					return newdata;
				}
			});
		}
	}
}