<template>
	<form class="form_wrapper" @submit.prevent="saveImage">
		<div class="form_header">Add new image</div>
		<div class="form_section">
			<label for="title:">Title:</label>
			<input type="text" id="title" v-model="newImage.title" required>
		</div>
		<div class="form_section">
			<label for="link">Url:</label>
			<input type="url" id="link" v-model="newImage.url" required>
		</div>
		<div class="form_buttons">
			<button class="default_btn btn" type="reset">Reset</button>
			<button class="primary_btn btn" type="submit">Submit</button>
		</div>
	</form>
</template>

<script>
export default {
	data: function(){
		return {
			newImage: {
				title: '',
				url: ''
			}
		}
	},
	methods: {
		saveImage: function(){
			let imageToSave = Object.assign({}, this.newImage);
			this.$store.dispatch('saveImage', imageToSave);
			this.clearForm();
		},
		clearForm: function(){
			this.newImage.title = '';
			this.newImage.url = '';
		}
	}
}

</script>

<style scoped>

form {
	width: 200px;
}

</style>