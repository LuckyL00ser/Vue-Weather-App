<template>
  <div id="app">
    
    <Navbar/> 
    <div class="container fluid px-4 px-lg-5 py-3">     
        <router-view/>    
    </div>

    <div id="alert-container" class="w-100" :class="[show? 'show': '']"  role="alert">
      <div class="alert col-md-6 col-11 mx-auto show" :class="[show?  'alert-'+type : '']"  role="alert">
            {{message}}
             
      </div>
      
    </div>
    
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  computed:{
    ...mapState('alert',['show','message','type']),   
  },
 
};
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  #alert-container{
    position: fixed;
    height:60px;
    top:-60px;   
    transition: 0.2s top cubic-bezier(.83,1.82,.81,.75),0.2s opacity;

    z-index:2000;
  } 
  #alert-container.show{
    top:20px;
  }
}
a, a:hover{
  text-decoration: none;
}
.card{
    border-radius: 1rem !important;    
}
.card-title{
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}


</style>
