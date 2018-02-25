<template>
	<div class="admin_workspace">
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
	}
}
</script>

<style lang="scss" scoped>

@import '~assets/css/variables.scss';

.admin_workspace{
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	padding: 50px;
	flex-direction: row;
	
	@media #{$sm} {
		flex-direction: column;
		align-items: center;
	}
}

</style>