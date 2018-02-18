<template>
	<nav class="navigation">
		<nuxt-link class="navigation_link" to="/">Home</nuxt-link>
		<nuxt-link class="navigation_link" to="/admin">Admin</nuxt-link>
		<nuxt-link class="navigation_link" to="/galery">Galery</nuxt-link>
		<nuxt-link class="navigation_link" to="/about">About</nuxt-link>
	</nav>
</template>

<script>
</script>

<style scoped>
	.navigation {
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		display: flex;
		justify-content: space-around;
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


</style>