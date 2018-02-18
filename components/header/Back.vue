<template>
	<div class="back_button">
		<nuxt-link :to="link"><i class="fas fa-undo-alt"></i> Back</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ['link']
}
</script>

<style scoped>
	.back_button{
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 20px;
		font-size: 22px;
	}

	.back_button > * {
		color: white;
		text-decoration: none;
	}
</style>