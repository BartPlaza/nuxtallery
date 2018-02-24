<template>
		<section class="galery">
			<galery-wrapper></galery-wrapper>
			<back-button link="/"></back-button>
		</section>
</template>

<script>
	import GaleryWrapper from '@/components/galery/GaleryWrapper.vue';
	export default{
		middleware: ['auth'],
		components: {
			'galery-wrapper': GaleryWrapper
		}
	}
</script>

<style>

</style>