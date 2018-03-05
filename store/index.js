import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase';

import images from './modules/images';

const createStore = function(){
	return new Vuex.Store({
		state:{
			user: null,
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
			}
		},
		actions:{
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
		},
		modules: {
			images: images
		}
	});
}
export default createStore;