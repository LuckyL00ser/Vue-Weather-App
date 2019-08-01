<template>
    <div class="col-8 mx-auto text-left">
        
        <form class="border border-secondary bg-light rounded p-3">
            <h1>Rejestracja</h1>
        <div class="form-group">            
            <input type="text"  v-model="username" class="form-control" placeholder="Login">            
        </div>
        <div class="form-group">            
            <input type="password" v-model="password"  class="form-control" placeholder="Hasło">
        </div>        
        <button @click="register" class="btn btn-primary d-block">Zarejestruj</button>
        <small>Masz już konto? 
            <router-link to="/login">
                Zaloguj się
            </router-link>
        </small>
        </form>
    </div>
</template>
<script>

export default {
  name: 'Register',
  data(){
      return{
          username: '',
          password: '',
      }
  },
  methods:{     
      register(){            
        if(this.username.length>4){
            if(this.password.length>4){
              this.$store.dispatch('user/register',{username: this.username,argPassword: this.password})
             
            }
                
            else
                this.$store.dispatch('alert/error','Zbyt krótkie hasło!')
        }           
        else
            this.$store.dispatch('alert/error','Zbyt krótka nazwa użytkownika')
      }     
  }
 
};
</script>

