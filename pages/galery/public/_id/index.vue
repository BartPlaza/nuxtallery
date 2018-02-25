<template>
	<div class="image_wrapper">
		<nuxt-link to="/galery/public" class="image" :style="{backgroundImage: 'url('+image.url+')'}"></nuxt-link>
		<back-button link="/galery/public"></back-button>
		<div class="description">
			{{shortURL}}
		</div>
	</div>

</template>

<script>
export default {
	computed: {
		image: function(){
			return this.$store.getters.showPublicImage(this.$route.params.id)
		},
		shortURL: function(){
			let splited =  this.image.url.split('/');
			return splited[2];
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

.description {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	text-align: center;
	z-index: 100;
	background-color: black;
	opacity: 0.7; 
	color: white;
	font-size: 14px;
	padding: 20px;
}

</style>