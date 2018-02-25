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

<style scoped>
	.back_button{
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 15px 20px 15px 20px;
		font-size: 22px;
		z-index: 1000;
	}

	.back_button > * {
		color: white;
		text-decoration: none;
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