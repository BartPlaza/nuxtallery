<template>
	<div class="image_wrapper">
		<nuxt-link to="/galery/public" class="image" :style="{backgroundImage: 'url('+image.url+')'}"></nuxt-link>
		<div class="image_ui" :class="{'not_auth': !isAuth}">
			<div class="ui_section" v-show="!isAuth">
				<button class="ui_button">
					<nuxt-link to="/" class="ui_button_login"><i class="fas fa-sign-in-alt"></i></nuxt-link>
				</button>
				<div class="ui_description">Please, log in first</div>
			</div>
			<div class="ui_section">
				<button class="ui_button" @click.prevent="addLike" :disabled="isLiked">
					<i class="far fa-thumbs-up" :class="{'is_liked': isLiked}"></i>
				</button>
				<div class="ui_description">{{isLiked ? 'You seemed to like' : 'Give like!'}}</div>
			</div>
			<div class="ui_section">
				<button class="ui_button" @click.prevent="copyLink">
					<i class="fas fa-link"></i>
				</button>
				<div class="ui_description">Copy link</div>
				<input id="image_link" type="text" :value="image.url">
			</div>
		</div>
		<back-button link="/galery/public"></back-button>
		<div class="description">
			{{shortURL}}
		</div>
	</div>

</template>

<script>
export default {
	computed: {
		image: function(){
			return this.$store.getters.showImage(this.$route.params.id)
		},
		shortURL: function(){
			let splited =  this.image.url.split('/');
			return splited[2];
		},
		isLiked: function(){
			let value = false;
			this.image.likes.forEach((like)=>{
				if (like == this.$store.getters.getUserId){
					value = true;
				}
			})
			return value;
		},
		isAuth: function(){
			return this.$store.getters.isAuthenticated;
		}
	}, 
	methods: {
		addLike: function(){
			if(this.isAuth){
				this.$store.dispatch('addLike', this.$route.params.id);
			}
		},
		copyLink: function(){
			document.getElementById('image_link').select();
			document.execCommand('Copy');
		}
	}	
}

</script>

<style scoped>

#image_link{
	position: absolute;
	right: 9999px;
}

.image_wrapper{
	background-color: black;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.image {
	width: 100vw;
	height: 100vh;
	background-size: cover;
	cursor: zoom-out;
}

.description {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	text-align: center;
	z-index: 100;
	background-color: black;
	opacity: 0.7; 
	color: white;
	font-size: 14px;
	padding: 20px;
}

.image_ui {
	position: fixed;
	right:0px;
	top: 100px;
	background-color: lightgrey;
	width:50px;
}

.ui_section{
	display: flex;
}

.ui_button{
	width: 50px;
	height: 50px;
	font-size: 25px;
	color: grey;
}

.ui_button:not([disabled]):hover{
	cursor: pointer;
}

.ui_button:hover + .ui_description {
	display: block;
}

.is_liked {
	color: #3b5998;
}

.ui_button:hover > .fas.fa-link{
	color: black;
}

.ui_description{
	position: absolute;
	right: 50px;
	white-space: nowrap;
	padding: 5px;
	background-color: #f5f5f5;
	display: none;
	border-top: 1px solid grey;
}

.not_auth > .ui_section:not(:first-child) > button{
	cursor: not-allowed !important;
}

.not_auth > .ui_section:not(:first-child){
	opacity: 0.5;
}

.ui_button_login{
	color: #3ca55c;
	display: block;
	width: 100%;
	height: 100%;
	line-height: 45px;
}


</style>