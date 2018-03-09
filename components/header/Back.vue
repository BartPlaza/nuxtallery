<template>
	<div class="back_button">
		<nuxt-link :to="link" :style="{color: color}"><i class="fas fa-undo-alt"></i> Back</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ['link', 'color']
}
</script>

<style scoped lang="scss">
	
	@import '~assets/css/variables.scss';

	.back_button{
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 15px 20px 15px 20px;
		font-size: 22px;
		z-index: 1000;

		@media #{$sm}{
			background-color: black;
			width: 100vw;
			padding: 10px;
			box-sizing: border-box;
			height: 50px;
			text-align: right;
			box-shadow: 0px 0px 2px 2px rgba(0,0,0,.75);
		}

	}

	.back_button > * {
		color: white;
		text-decoration: none;

		@media #{$sm}{
			color: white !important;
		}
	}

	.back_button i {
		transform: rotateZ(0deg);
		transition: all 0.5s;
	}

	.back_button:hover i {
		transform: rotateZ(-65deg);
		transition: all 0.5s;
	}
</style>