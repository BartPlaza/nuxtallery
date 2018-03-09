<template>
	<div>
		<div class="wrapper">
			<div class="search_bar">
				<label for="search"> Search for</label>
				<input type="text" id="search" class="search_input" autocomplete="false" v-model="search">
				<i class="fas search_icon" :class="search == '' ? 'fa-search' : 'fa-times'" @click="search = ''"></i>
			</div>
			<galery-image v-for="(image,index) in filteredImages" :key="image.id" :image="image" :info="classes[index]"></galery-image>
		</div>
	</div>
</template>

<script>
	import GaleryImage from '@/components/galery/GaleryImage.vue';

	export default{
		components: {
			'galery-image': GaleryImage
		},
		props: {
			images: {
				type: Array,
				required: true
			},
			private: {
				type: Boolean,
				required: true
			}
		},
		data: function(){
			return {
				classes: [],
				search: ''
			}
		},
		computed: {
			filteredImages: function(){
				return this.images.filter((image)=>{
					return image.title.toLowerCase().match(this.search.toLowerCase());
				})
			}
		},
		created: function(){
				for(let i=0; i<this.images.length;){
					if((this.images.length-i) >= 3){
						//losuj pozycje

						let random = Math.floor((Math.random()*3)+1);
						if(random==1){
							this.classes.push('twoS','one','one');
						}else if(random==2){
							this.classes.push('one','twoM','one');
						}else {
							this.classes.push('one','one','twoE');
						}
						i+=3;

					}else if((this.images.length-i) == 2){
						this.classes.push('one','twoM');
						i+=2;
					} else if((this.images.length-i) == 1){
						this.classes.push('one');
						i++;
					}
				}
		}
	}
</script>

<style lang="scss" scoped>

@import '~assets/css/variables.scss';

.wrapper {
	padding: 1em;
	padding-top: 4em;
	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: 30vh;
	background-color: rgba(0,0,0,0.9);
	min-height: 100vh;


	@media #{$sm} {
		grid-template-columns: repeat(2, 1fr);
	}
}

.search_bar {
		background-color: black;
		padding: 10px;
		color: white;
		text-align: center;
		position: fixed;
		top: 0;
		z-index: 1000;
		width: 100vw;
		font-size: 18px; 
		box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
	}
	.search_input {
		background-color: black;
		border: none;
		border-bottom: 1px solid white;
		font-size: 18px;
    	font-family: Quicksand,sans-serif;
    	color: white;
    	margin-left: 5px;
    	max-width: 50%;
	}

	.search_input:focus {
		outline: none;
	}

	.search_icon {
		width: 30px;
	}

	.search_icon.fa-times:hover
	{
		cursor: pointer;
		color: #F9A6A6;
	}


</style>