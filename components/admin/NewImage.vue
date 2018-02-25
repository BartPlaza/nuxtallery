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
		<div class="form_section section_inline">
			<label for="private">Is private?</label>
			<input class="form_checkbox" type="checkbox" id="private" v-model="newImage.private">
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
				url: '',
				private: false
			}
		}
	},
	computed: {
		userId: function(){
			return {
				userId: this.$store.getters.getUserId
			};
		}
	},
	methods: {
		saveImage: function(){
			let imageToSave = Object.assign({}, this.newImage, this.userId);
			console.log(imageToSave);
			this.$store.dispatch('saveImage', imageToSave);
			this.clearForm();
		},
		clearForm: function(){
			this.newImage.title = '';
			this.newImage.url = '';
			this.newImage.private = false;
		}
	}
}

</script>

<style scoped>

form {
	width: 200px;
}

</style>