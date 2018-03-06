<template>
	<div class="images_container">
		<div class="images_wrapper">
			<h2>Public images</h2>
			<div class="image" v-for="image in publicImages" :style="{backgroundImage:'url('+image.url+')'}">
				<a href="#" @click="deleteImage(image.id)"><i class="fas fa-trash-alt"></i></a>
			</div>
		</div>
		<div class="images_wrapper">
			<h2>Private images</h2>
			<div class="image" v-for="image in privateImages" :style="{backgroundImage:'url('+image.url+')'}">
				<a href="#" @click="deleteImage(image.id)"><i class="fas fa-trash-alt"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			publicImages: function(){
				return this.$store.getters.userPublicImages(this.$store.getters.getUserId);
			},
			privateImages: function(){
				return this.$store.getters.userPrivateImages(this.$store.getters.getUserId);
			}
		},
		methods: {
			deleteImage: function(id){
				this.$store.dispatch('deleteImage', id);
			}
		}
	}
</script>

<style scoped lang="scss">

@import '~assets/css/variables.scss';

.images_container {
	display: flex;
	flex-direction: row;
	flex: 1;
	justify-content: space-between;

	@media #{$sm} {
		flex-direction: column;
		width: 100%;
	}
}

.images_wrapper {
	display: flex;
	flex: 1;
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