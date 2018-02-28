<template>
	<nav class="navigation" :class="{'dark-background' : !burgerMenu}">
		<div class="navigation_left">
			<i class="fas response_icon" :class="burgerMenu ? 'fa-bars': 'fa-times'" @click="burgerMenu = !burgerMenu" ></i>
			<nuxt-link class="navigation_link" :class="burgerMenu ? 'hide_response' : 'show_response'" to="/">Home</nuxt-link>
			<nuxt-link class="navigation_link" :class="burgerMenu ? 'hide_response' : 'show_response'" to="/admin">Admin</nuxt-link>
			<span class="with_subnav" :class="burgerMenu ? 'hide_response' : 'show_response'">
				<nuxt-link class="navigation_link" to="/galery/public">Galery
					<i class="fas fa-sort-down" v-show="loggedIn"></i>
				</nuxt-link>
				<div class="sub_navigation" v-show="loggedIn">
					<nuxt-link class="sub_navigation_link" to="/galery/public">Public</nuxt-link>
					<nuxt-link class="sub_navigation_link" to="/galery/private">My gallery</nuxt-link>
				</div>
			</span>
			<nuxt-link class="navigation_link" :class="burgerMenu ? 'hide_response' : 'show_response'" to="/about">About</nuxt-link>
		</div>
		<div class="navigation_right">
			<span class="with_subnav">
				<nuxt-link class="navigation_link" to="/auth">
					<i :class="{'fas fa-lightbulb' : loggedIn, 'far fa-lightbulb' : !loggedIn}"></i>
					{{loggedIn ? 'Logged In' : 'Click to Log In '}}
					<i class="fas fa-sort-down" v-show="loggedIn"></i>
				</nuxt-link>
				<div class="sub_navigation" v-show="loggedIn">
					<nuxt-link class="sub_navigation_link" to="/admin">Profile</nuxt-link>
					<a class="sub_navigation_link" @click.prevent="logOut">Logout</a>
				</div>
			</span>
		</div>
	</nav>
</template>

<script>
	export default{
		data: function(){
			return {
				burgerMenu: true
			}
		},
		computed: {
			loggedIn: function(){
				return this.$store.getters.isAuthenticated;
			}
		},
		methods: {
			logOut: function(){
				this.$store.dispatch('logoutUser');
			}
		}
	}
</script>

<style lang="scss" scoped>

@import '~assets/css/variables.scss';

	.navigation {
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		padding: 20px 0 20px 0;
		display: flex;
		justify-content: space-between;
	}

	.navigation_left{
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		flex: 4;

		@media #{$sm}{
			flex: 1;
			flex-direction: column;
			margin-left: 20px;
		}
	}

	.hide_response{
		@media #{$sm}{
			transform: translateX(-200px);
			transition: all 0.5s;
		}
	}

	.show_response{
		@media #{$sm}{
			transform: translateX(0px);
			transition: all 1s;
		}
	}

	.dark-background{
		@media #{$sm}{
			background-color: black;
			box-shadow: 0 8px 6px -6px black;
		}
	}

	.response_icon {
		color: white;
		font-size: 28px;
		margin-left: 20px;
		margin-top: 13px;
		display: none;
		@media #{$sm}{
			display: block;
			}
	}

	.response_icon:hover{
		cursor: pointer;
	}

	.navigation_right{
		display: flex;
		flex:1;
		justify-content: space-around;
		margin-right: 20px;

		@media #{$sm}{
			margin-right: 20px;
			justify-content: flex-end;

		}
	}

	.navigation_link{
		text-decoration: none;
		color: white;
		font-weight: bold;
		font-size: 28px;
		padding-bottom:5px;
		@media #{$sm}{
			margin-top: 10px;
			font-size: 20px;
		}
	}

	.navigation_link:hover{
		border-bottom: 2px solid white;
	}

	.with_subnav{
		@media #{$sm}{
			margin-top: 10px;
		}
	}

	.with_subnav:hover > .navigation_link + .sub_navigation {
		display: flex;

		
	}

	.fas.fa-lightbulb{
		color: white;
		text-shadow: 0px -2px 10px #ffff8d;
	}

	.sub_navigation{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		display: none;
		margin-top: 15px;
		padding-bottom: 5px;
			@media #{$sm}{
				align-items: flex-start;
			}
	}
	.sub_navigation_link{
		text-decoration: none;
		font-size: 18px;
		color: white;
		padding-bottom: 5px;
			@media #{$sm}{
				
			}
	}

	.sub_navigation_link:hover {
		font-weight: bold;
		cursor: pointer;
	}

</style>