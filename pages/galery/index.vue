<template>
		<section class="galery">
			<galery-wrapper></galery-wrapper>
			<back-button link="/"></back-button>
		</section>
</template>

<script>
	import GaleryWrapper from '@/components/galery/GaleryWrapper.vue';
	import Back from '@/components/header/Back.vue';
	export default{
		components: {
			'galery-wrapper': GaleryWrapper,
			'back-button': Back
		}
	}
</script>

<style>

</style>