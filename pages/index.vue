<template>
  <div class="container">
    <navigation></navigation>
    <div class="hero">
        <h1>Nuxtallery<sup> &reg;</sup></h1>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/header/Navigation.vue'
export default {
  components: {
    'navigation': Navigation 
  }
}
</script>

<style lang="scss" scoped>

@import '~assets/css/variables.scss';

  .container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb");
    background-size: cover;
  }

  .hero {
    background-color: rgba(0,0,0,0.5);
    width: 100%;

  }
  
  .hero > h1{
    margin:15px;
    font-size: 14vw;
    color: #3ca55c;
    background-image: linear-gradient(to right, #3ca55c, #b5ac49);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;

      @media #{$sm} {
          font-size: 18vw;
      }
  }

  .hero > h1 > sup {
    font-size: 7vw;
  }


</style>
