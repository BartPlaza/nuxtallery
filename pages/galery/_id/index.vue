<template>
	<div class="image_wrapper">
		<div class="image" :style="{backgroundImage: 'url('+image.url+')'}"></div>
		<back-button link="/galery"></back-button>
	</div>

</template>

<script>

import Back from '@/components/header/Back.vue';
export default {
	components: {
		'back-button': Back
	},
	computed: {
		image: function(){
			return this.$store.getters.showImage(this.$route.params.id)
		}
	}
	/*asyncData: function(context){
		return axios.get('https://nuxtallery.firebaseio.com/images/'+context.params.id+'.json')
		.then(function(response){
			if(response.data === null){
				context.error({ statusCode: 404, message: 'Sorry...Image not found' })
			}
			return {
				image: response.data
			}
		})
		.catch(function(error){
			context.error({ statusCode: 404, message: 'Sorry...Image not found' })
		});
	}/*
	data: function(){
		return {
			image: {}
		}
	},
	created: function(){
		const el = this;
		axios.get('https://nuxtallery.firebaseio.com/images/'+el.$route.params.id+'.json')
		.then(function(response){
			el.image = response.data;
		})
		.catch(function(error){
			console.log(error);
		});
		
	}*/
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
}

</style>