<template>
	<div class="full_centered">
		<form class="form_wrapper" @submit.prevent="callRequest">
			<div class="form_header">{{signIn ? 'Sign In' : 'Sign Up'}}</div>
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
				<button class="primary_btn btn" type="submit">{{signIn ? 'Sign In' : 'Sign Up'}}</button>
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

export default{
	middleware: ['noLogWhenAuth'],
	mounted: function(){
		if(localStorage.getItem('authUser')){
			this.$router.push('/admin')
		}
	},
	data: function(){
		return {
			signIn: true,
			credentials: {
				email: '',
				password: '',
			},
			errors: {
				show: false,
				message: ''
			}
		}
	},
	methods: {
		callRequest: function(){
			this.errors.show = false;
			let el = this;
			let actionURL ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.firebaseAPIKey;
			if(!this.signIn){
				actionURL ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.firebaseAPIKey;
			}
			console.log(actionURL);
			axios.post(actionURL, {
					email: this.credentials.email,
					password: this.credentials.password,
					returnSecureToken: true
				})
				.then(function(response){
					//Convert expires in to expireas at
					let validTime = response.data.expiresIn * 1000 + Date.now();
					response.data.expiresIn = validTime;

					el.$store.commit('logInUser', response.data);
					localStorage.setItem('authUser', JSON.stringify(response.data));
					el.$store.dispatch('logOutTimer', response.data.expiresIn - Date.now());
				})
				.then(function(){
					el.$router.push('/admin');
				})
				.catch(function(error){
					el.errors.show = true;
					el.errors.message = error.response.data.error.message;
				});
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