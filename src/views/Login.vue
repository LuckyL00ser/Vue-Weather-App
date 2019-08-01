<template>
    <div class="col-8 mx-auto text-left">
        <div v-if="loggedIn">
            <h1>Jesteś już zalogowany</h1>
        </div>
        <form class="border border-secondary bg-light rounded p-3" v-else>
            <h1>Zaloguj się</h1>
        <div class="form-group">            
            <input type="text"  v-model="username" class="form-control" placeholder="Login">            
        </div>
        <div class="form-group">            
            <input type="password" v-model="password" min=8 class="form-control" placeholder="Hasło">
        </div>        
        <button @click="login" class="btn btn-primary d-block">Zaloguj</button>
        <small>Nie masz konta? 
            <router-link to="/register">
                Zarejestruj się
            </router-link>
        </small>
        </form>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
import {mapState} from 'vuex';

export default {
  name: 'Login',
  computed: {
      ...mapState('user',['loggedIn']),
  },
  data(){
      return{
          username: '',
          password: '',
      }
  },

  methods:{     
      login(){            
        this.$store.dispatch('user/login',{username: this.username,password: this.password})      
      }
  },
  created(){
      if(this.loggedIn){
          setTimeout(()=>{
              this.$router.push('/');
          },3000);
      }
  }
 
};
</script>

