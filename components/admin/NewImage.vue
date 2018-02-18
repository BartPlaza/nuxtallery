<template>
	<form class="add_image_form" @submit.prevent="saveImage">
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

<style>

.add_image_form{
	width: 200px;
	padding: 5px;
	border: 1px solid #56a758;
}

.form_header{
	text-align: center;
	margin-bottom: 5px;
}

.form_section {
	display: flex;
	flex-direction: column;
	padding: 10px;
	font-size: 14px;
}

.form_section > input {
	border: none;
	border-bottom: 1px dashed grey;
	margin-top: 5px;
	font-size: 16px;
	font-family: 'Quicksand', sans-serif;
	font-weight: bold;
	color: #56a758;
}

.form_section > input:focus{
	outline:none;
	border-bottom: 1px dashed #56a758;
}

.form_buttons {
	padding: 10px;
	display: flex;
	justify-content: space-around;
}

.btn{
	padding: 5px 10px 5px 10px;
	border:none;
}

.btn:hover{
	cursor:pointer;
}

.btn:focus{
	outline:none;
}

.primary_btn{
	background-color: #56a758;
	color: white;	
}

.default_btn{
	color: grey;
	background-color: white;
}


</style>