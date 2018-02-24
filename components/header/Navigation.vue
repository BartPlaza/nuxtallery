<template>
	<nav class="navigation">
		<nuxt-link class="navigation_link" to="/">Home</nuxt-link>
		<nuxt-link class="navigation_link" to="/admin">Admin</nuxt-link>
		<nuxt-link class="navigation_link" to="/galery">Galery</nuxt-link>
		<nuxt-link class="navigation_link" to="/about">About</nuxt-link>
		<span class="with_subnav">
			<nuxt-link class="navigation_link" to="/auth">
				<i :class="{'fas fa-lightbulb' : loggedIn, 'far fa-lightbulb' : !loggedIn}"></i>
				{{loggedIn ? 'Logged In' : 'Logged Out '}}
				<i class="fas fa-sort-down" v-show="loggedIn"></i>
			</nuxt-link>
			<div class="sub_navigation" v-show="loggedIn">
				<nuxt-link class="sub_navigation_link" to="/admin">Profile</nuxt-link>
				<a class="sub_navigation_link" @click.prevent="logOut">Logout</a>
			</div>
		</span>
		
	</nav>
</template>

<script>
	export default{
		computed: {
			loggedIn: function(){
				return this.$store.getters.isAuthenticated;
			}
		},
		methods: {
			logOut: function(){
				this.$store.commit('logOutUser');
				localStorage.removeItem('authUser');
			}
		}
	}
</script>

<style scoped>
	.navigation {
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		padding: 20px;
	}
	.navigation_link{
		text-decoration: none;
		color: white;
		font-weight: bold;
		font-size: 22px;
		padding-bottom:5px;
	}

	.navigation_link:hover{
		border-bottom: 2px solid white;
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
	}
	.sub_navigation_link{
		text-decoration: none;
		font-size: 16px;
		color: black;
	}

	.sub_navigation_link:hover {
		font-weight: bold;
		cursor: pointer;
	}

</style>