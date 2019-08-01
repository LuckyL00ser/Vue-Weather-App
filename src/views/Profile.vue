<template>
<div class="row">
    <div class="col-md-6 col-12 mx-auto card p-0 shadow-lg d-flex">
      <div class="mt-3" v-if="!loggedIn">
        <h1>Nie jesteś zalogowany</h1>
      <p>Dostęp do tej strony mają jedynie zalogowani użytkownicy.</p>   
      </div>
      <div v-else>
          <h4 class="card-title p-3 mb-0 bg-secondary text-white">Witaj {{username}}</h4>
           <div class="card-body justify-content-between d-flex flex-column flex-lg-row">
             
            <span class="flex-grow-1 px-1 my-2"> 
              <button class="btn btn-primary w-100" @click="changePasswordEvent"><i class="fas fa-user-edit"></i> Zmień hasło</button>
                </span>
            <span class="flex-grow-1 px-1 my-2"> 
              <button class="btn btn-primary w-100" @click="changeUsernameEvent"><i class="fas fa-user-edit"></i>Zmień login</button>  
              </span>
            <span class="flex-grow-1 px-1 my-2"> 
              <button class="btn btn-danger w-100" @click="deleteAccountEvent"><i class="fas fa-user-slash"></i>Usuń konto</button>  
              </span>
            
            </div> 
            <double-input-modal ref="modal" :firstType="firstType" :secondType="secondType"  @accepted="actionEvent">
              <template #title>
                {{actionTitle}}
              </template>
              <template #firstInput>
                {{firtInputTitle}}
              </template>
              <template #secondInput>
                {{secondInputTitle}}
              </template>
            </double-input-modal>
      </div>
    </div>
  </div>
 </template>

<script>
import DoubleInputModal from '../components/DoubleInputModal.vue';
import {mapActions} from 'vuex';

export default {
  name: 'Profile',
  components: {DoubleInputModal},
  computed:{
      loggedIn(){
          return this.$store.state.user.loggedIn;
      },
       username(){
          return this.$store.state.user.user.name;
      },
      
  },
 created(){
     if(!this.loggedIn)
        setTimeout(()=>{
        this.$router.push('/');
        },2500);
  },
  methods:{
    ...mapActions('user',['updateUserData','deleteUser']),
      ...mapActions('alert',['warning']),
      changePasswordEvent(){
           $('#modal').modal('show');
           this.actionEvent=this.changePassword;
           this.firstType='password';
           this.secondType='password';
           this.actionTitle="Zmiana hasła";
           this.firtInputTitle="Stare hasło";
           this.secondInputTitle="Nowe hasło";
      },
      changeUsernameEvent(){
           $('#modal').modal('show');
           this.actionEvent=this.changeUsername;
           this.firstType='text';
           this.secondType='password';
           this.actionTitle="Zmiana nazwy użytkownika";
           this.firtInputTitle="Nowa nazwa";
           this.secondInputTitle="Hasło";
      },
      deleteAccountEvent(){
           $('#modal').modal('show');
           this.actionEvent=this.deleteAccount;
           this.firstType='password';
           this.secondType='password';
           this.actionTitle="Usuwanie konta";
           this.firtInputTitle="Hasło";
           this.secondInputTitle="";
      },
      changePassword(oldPassword,password){
        
          if(password.length<4)
            this.warning('Zbyt krótkie hasło');
          else
          {
              this.updateUserData({username:'',authPassword: oldPassword,newPassword: password});
              $('#modal').modal('hide');
          }
            
      },
      changeUsername(newUsername,password){
          if(newUsername.length<4)
            this.warning('Zbyt krótka nazwa');
          else{
            this.updateUserData({username:newUsername,authPassword: password});
               $('#modal').modal('hide');
          }
      },
      deleteAccount(password){
        this.deleteUser(password);
          $('#modal').modal('hide');
      }
  },
  data(){
    return {
          actionTitle:'',
          actionEvent: ()=>{},
          firstType: '',
          secondType: '',
          firtInputTitle:'',
          secondInputTitle: '',
          
          
    }
   }
};
</script>
