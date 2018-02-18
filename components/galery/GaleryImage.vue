<template>
	<nuxt-link :to="'/galery/'+image.id" class="image" :class="info" :style="{backgroundImage: 'url('+image.url+')'}">
		
	</nuxt-link>
</template>

<script>
export default {
	props: {
		image: {
			type: Object,
			required: true
		},
		info: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>

.image {
	background-color: grey;
	background-size: cover;
	filter:  contrast(90%) grayscale(20%);
	border: 1px solid black;
}

.image:hover{
	cursor:pointer;
	filter:  contrast(100%) grayscale(0%);
	border: 1px solid #3ca55c;

}

.image.twoS{
	grid-column: 1 / span 2;
}

.image.twoM{
	grid-column: 2 /span 2;
}

.image.twoE{
	grid-column: 3 / span 2;
}
</style>