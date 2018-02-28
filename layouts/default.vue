<template>
  <div class="layout_wrapper">
    <nuxt/>
  </div>
</template>

<script>
  export default{
    mounted: function(){
      
      let user;
      if(user = localStorage.getItem('authUser')){
        user = JSON.parse(user);
        if(user.expiresIn > Date.now()){
          this.$store.commit('logInUser', user);
          this.$store.dispatch('logOutTimer', user.expiresIn - Date.now());
          this.$store.dispatch('setPrivateImages', user.localId);
        }
      } 
    }
  }
</script>

<style>

html{
  font-family: 'Quicksand', sans-serif;
}

body {
  margin: 0;
  padding:0;
  min-height: 100vh;
}

#__nuxt{
  min-height: 100vh;
}

#__layout{
  min-height: 100vh;
}

.layout_wrapper{
  min-height: 100vh;
}

</style>
