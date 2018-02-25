<template>
	<div class="images_wrapper">
		<div class="image" v-for="image in images" :style="{backgroundImage:'url('+image.url+')'}">
			<a href="#" @click="deleteImage(image.id)"><i class="fas fa-trash-alt"></i></a>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			images: function(){
				return this.$store.getters.privateImages;
			}
		},
		methods: {
			deleteImage: function(id){
				this.$store.dispatch('deleteImage', id);
			}
		}
	}
</script>

<style scoped>

.images_wrapper {
	justify-content: center;
	margin-top: 30px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, 100px);
	grid-auto-rows: 100px;
	grid-gap: 10px;
}

.image {
	background-color: black;
	background-size: cover;
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
}

.image:hover > a {
	display:block;
	cursor: pointer;
}

.image > a {
	display: none;
	background-color: rgba(0,0,0,0.5);
	color: white;
	text-decoration: none;
	padding: 4px;
}

</style>