<template>
	<div class="image_wrapper">
		<nuxt-link to="/galery/private" class="image" :style="{backgroundImage: 'url('+image.url+')'}"></nuxt-link>
		<back-button link="/galery/private"></back-button>
	</div>

</template>

<script>
export default {
	computed: {
		image: function(){
			return this.$store.getters.showPrivateImage(this.$route.params.id)
		}
	}	
}

</script>

<style scoped>

.image_wrapper{
	background-color: black;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.image {
	width: 100vw;
	height: 100vh;
	background-size: cover;
	cursor: zoom-out;
}

</style>