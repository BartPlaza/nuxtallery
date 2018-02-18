<template>
	<div class="container">
    	<h1 v-if="error.statusCode === 404"><i class="fas fa-exclamation"></i> {{error.message}}</h1>
    	<h1 v-else>An error occurred</h1>
    	<nuxt-link class="link" to="/">Back to home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
  }
</script>

<style>

 .container {
 	height: 100vh;
 	display: flex;
 	flex-direction: column;
 	justify-content: center;
 	align-items: center;
 	color: grey;
 	font-size: 2vw;
 }

 .container > .link {
 	text-decoration: none;
 	color: #3ca55c;
 	border-bottom: 1px solid #3ca55c;
 }


</style>