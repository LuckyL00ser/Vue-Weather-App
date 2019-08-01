<template>
  <div class="row ">
    <div class="col-12 "  v-if="!loggedIn">
    <h1>Pogodynka</h1>
        <p>Witaj w aplikacji do sprawdzania pogody. </p>
        <div>
          <router-link class="btn btn-primary" to="/login">
          Zaloguj się
        </router-link>
        lub
        <router-link class="btn btn-primary" to="/register">
         Załóż konto
        </router-link>
        </div>
    </div>
    <div  class="col-12 d-flex flex-wrap" v-else>     
          <div class="card mx-auto my-2 shadow">
              <router-link class="my-auto" to="/weather">
              <h5 class="card-title"><i class="fas fa-cloud-sun"></i></h5>
            </router-link>
            </div>
            <div class="card mx-auto my-2 shadow">
             <router-link class="my-auto" to="/profile">
            <h5 class="card-title"><i class="fas fa-id-card"></i></h5>
          </router-link>
          </div>               
      </div>
      </div>
</template>

<script scoped>
// @ is an alias to /src
import { mapState } from 'vuex';


export default {
  name: 'home',
  computed: {
    ...mapState('user', ['loggedIn', 'userCities']),
  },
};
</script>

<style scoped>

.card{
  height: 300px;
  width:300px;
}
h5{
  font-size:120px;
}
</style>
