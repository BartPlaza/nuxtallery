<template>
		<section class="galery">
			<galery-wrapper :images="images" :private="false"></galery-wrapper>
			<back-button link="/"></back-button>
		</section>
</template>

<script>
	import GaleryWrapper from '@/components/galery/GaleryWrapper.vue';
	
	export default{
		components: {
			'galery-wrapper': GaleryWrapper
		},
		computed: {
			images: function(){
				return this.$store.getters.publicImages;
			}
		}
	}
</script>

<style scoped lang="scss">

@import '~assets/css/variables.scss';

.galery {
	@media #{$sm} {
		margin-bottom: 50px;
	}
}

</style>