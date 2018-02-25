<template>
		<section class="galery">
			<galery-wrapper :images="images" :private="true"></galery-wrapper>
			<back-button link="/"></back-button>
		</section>
</template>

<script>
	import GaleryWrapper from '@/components/galery/GaleryWrapper.vue';
	export default{
		middleware: ['auth'],
		components: {
			'galery-wrapper': GaleryWrapper
		},
		computed: {
			images: function(){
				return this.$store.getters.privateImages;
			}
		}
	}
</script>

<style>

</style>