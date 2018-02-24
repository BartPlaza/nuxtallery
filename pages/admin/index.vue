<template>
	<div class="admin_workspace">
		<h1>Admin page</h1>
		<new-image></new-image>
		<all-images></all-images>
		<back-button link="/" color="black"></back-button>
	</div>
</template>

<script>
import NewImage from '@/components/admin/NewImage.vue'
import AllImages from '@/components/admin/AllImages.vue'
import axios from 'axios';
export default {
	middleware: ['auth'],
	components: {
		'new-image': NewImage,
		'all-images': AllImages
	},
	mounted: function(){
		const el = this;
		this.$on('itemDeleted', function(id){
		console.log('deleted');	
			el.images.forEach(function(item,index){
				console.log('deleted');
				if(el.images[index].id == id){
					el.images.splice(index,1);

					return;
				}
			});
		})
	}
}
</script>

<style scoped>

.admin_workspace{
	
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 20px;
	flex-direction: column;
}

</style>