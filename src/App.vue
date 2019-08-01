<template>
  <div id="app">
    
<Navbar/> 
    <div class="container p-5">
      <router-view/>
    </div>

    <div class="alert alert-dissmissible col-md-6 col-12 mx-auto" :class="[show? ['show', 'alert-'+type ]: ''  ]"  role="alert">
      {{message}}
      <button type="button" class="close" data-dismiss="alert">
        <span aria-hidden="true">&times;</span>
      </button>
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
  
  .alert{
    position: fixed;
    height:60px;
    bottom:-60px;    
    left:20px;
    right:20px;
    transition: 0.2s bottom cubic-bezier(.83,1.82,.81,.75),0.2s opacity;
    z-index:2000;
  } 
  .alert.show{
    bottom:20px;
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
