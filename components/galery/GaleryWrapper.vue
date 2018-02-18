<template>
	<div>
		<div class="wrapper">
			<galery-image v-for="(image,index) in images" :key="image.id" :image="image" :info="classes[index]" ></galery-image>
		</div>
	</div>
</template>

<script>
	import GaleryImage from '@/components/galery/GaleryImage.vue'; 
	export default{
		components: {
			'galery-image': GaleryImage
		},
		data: function(){
			return {
				classes: []
			}
		},
		computed: {
			images: function(){
				return this.$store.getters.loadedImages;
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

<style scoped>

.wrapper {
	padding: 1em;
	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: 30vh;
	background-color: rgba(0,0,0,0.9);
	min-height: 100vh;
}
</style>