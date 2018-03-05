<template>
	<nuxt-link :to="'/galery/'+(private ? 'private/' : 'public/')+image.id" class="image" :class="info" :style="{backgroundImage: 'url('+image.url+')'}">
		<div class="description">
			<span>{{image.title}}</span>
			<span><i class="fas fa-thumbs-up"></i> {{image.getImageLikes}}</span>
		</div>
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
		},
		private: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		
	}
}
</script>

<style lang="scss" scoped>

@import '~assets/css/variables.scss';

.image {
	filter: blur(10px);
	overflow: hidden;
	background-color: grey;
	background-size: cover;
	filter:  contrast(90%) grayscale(20%);
	border: 1px solid black;
	text-decoration: none;
	display: flex;
	align-items: flex-end;



		@media #{$sm} {
			grid-column: 1 / span 2;
		}

}

.image:hover{
	cursor:zoom-in;
	filter:  contrast(100%) grayscale(0%);
	border: 1px solid #3ca55c;

}

.image.twoS{
	grid-column: 1 / span 2;
	@media #{$sm} {
		grid-column: 1 / span 2;
	}
}

.image.twoM{
	grid-column: 2 /span 2;
	@media #{$sm} {
		grid-column: 1 / span 2;
	}
}

.image.twoE{
	grid-column: 3 / span 2;
	@media #{$sm} {
		grid-column: 1 / span 2;
	}
}

.description{
	display: flex;
	justify-content: space-between;
	white-space: normal;
	background-color: rgba(0,0,0,0.7);
	width: 100%;
	color: white;
	text-decoration: none;
	padding: 5px;
	font-size: 12px;

}
</style>