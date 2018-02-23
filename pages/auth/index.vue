<template>
	<div class="full_centered">
		<form class="form_wrapper">
			<div v-if="signIn" class="form_header">Sign in</div>
			<div v-if="!signIn" class="form_header">Sign up</div>
			<div class="form_section">
				<label for="email:">Email:</label>
				<input type="email" id="email" required>
			</div>
			<div class="form_section">
				<label for="password">Password:</label>
				<input type="Password" id="password" required>
			</div>
			<div class="form_section" v-if="!signIn">
				<label for="repeat_password">Repeat Password:</label>
				<input type="Password" id="repeat_password" required>
			</div>
			<div class="form_buttons">
				<button v-if="signIn" @click.prevent="signIn = false" class="default_btn btn">Want to Register?</button>
				<button v-if="!signIn" @click.prevent="signIn = true" class="default_btn btn">Want to Login?</button>
				<button v-if="signIn" class="primary_btn btn" type="submit">Sign In</button>
				<button v-if="!signIn" class="primary_btn btn" type="submit">Sign Up</button>
			</div>
		</form>
	</div>
</template>

<script>

export default{
	data: function(){
		return {
			signIn: true
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