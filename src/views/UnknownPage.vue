<template>
  <div class="row">
    <div class="col-6 mx-auto card d-flex">
      <div class="my-auto">
        <h1>Błąd 404</h1>
        <p>Podana strona nie istnieje.</p>      
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
// @ is an alias to /src

export default {
  name: 'UnknownPage',
  created(){
    setTimeout(()=>{
      this.$router.push('/');
    },2500);
  }
};
</script>
