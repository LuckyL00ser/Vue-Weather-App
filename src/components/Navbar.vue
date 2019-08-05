<template>
<nav class="navbar navbar-expand-lg bg-light shadow-sm  justify-content-between">
        <router-link class="navbar-brand mx-auto mx-sm-0" to="/">
        <i class="fas fa-cloud-sun-rain"></i>
        WeatherApp</router-link>
 
    <div id="collapse" class="d-none d-sm-block" v-if="loggedIn">
        <router-link to="/weather">Pogoda<i class="fas fa-sun"></i></router-link> |
        <router-link to="/profile" >Profil <i class="far fa-user-circle"></i></router-link> |
        <a href="#" @click="logout">Wyloguj<i class="fas fa-sign-out-alt"></i></a>
    </div>
</nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed:{
    ...mapState('user',['loggedIn']),
   
  },
  methods:{
      logout(){
          this.$store.dispatch('user/logout');
          this.$router.push('/');
      }
  }
 
};
</script>
<style scoped>

#collapse a{
  margin-left:10px;
}
#collapse a i{
  margin-left:4px;
}
.navbar-brand{
  font-size:28px;
}
</style>