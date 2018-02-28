<template>
	<div class="full_centered">
		<form class="form_wrapper" @submit.prevent="callRequest">
			<div class="form_header">{{signIn ? 'Login' : 'Create account'}}</div>
			<div class="form_section">
				<label for="email:">Email:</label>
				<input type="email" id="email" required v-model="credentials.email">
			</div>
			<div class="form_section">
				<label for="password">Password:</label>
				<input type="Password" id="password" required v-model="credentials.password">
			</div>
			<!--
			<div class="form_section" v-if="!signIn">
				<label for="repeat_password">Repeat Password:</label>
				<input type="Password" id="repeat_password" required v-model="credentials.repeat_password"> 
			</div>
			-->
			<div class="form_buttons">
				<button @click.prevent="signIn = !signIn" class="default_btn btn"> {{signIn ? 'Want to Register?' : 'Want to login?'}}</button>
				<button class="primary_btn btn" type="submit">{{signIn ? 'Login' : 'Register'}}</button>
			</div>
			<div class="form_section" v-show="errors.show">
				<div class="form_error">
					{{errors.message}}
				</div>
			</div>
		</form>
		<back-button link="/" color="black"></back-button>
	</div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default{
	created: function(){
		let el = this;
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				el.$router.push('/admin');
			}
		})
	},
	data: function(){
		return {
			signIn: true,
			credentials: {
				email: '',
				password: '',
			}
		}
	},
	computed: {
		errors: function(){
			return this.$store.getters.getFormErrors;
		}
	},
	methods: {
		callRequest: function(){
			this.errors.show = false;
			if(this.signIn){
				this.$store.dispatch('loginUser', this.credentials);
			} else {
				this.$store.dispatch('registerUser', this.credentials);
			}
			//el.$store.dispatch('setPrivateImages', response.data.localId);	
		}
	}
}
</script>

<style scope>

form {
	width: 300px;
}

.full_centered {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-image: url('~assets/images/retina_wood.png');	
}

</style>