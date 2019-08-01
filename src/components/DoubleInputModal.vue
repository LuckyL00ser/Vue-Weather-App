<template>
 <div class="modal " id="modal" >
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
            <slot name="title"></slot>
        </h5>        
      </div>
      <div class="modal-body">
        <form class="text-left">
          <h5><slot name="firstInput"></slot></h5>
          <input v-model="firstLine" class="form-control"  :type='firstType'>
          <h5><slot name="secondInput"></slot></h5>
          <input v-model="secondLine" class="form-control"  :type='secondType'>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" data-dismiss="modal" @click="clear">Anuluj</button>
        <button type="button" class="btn btn-outline-success" @click="$emit('accepted',firstLine,secondLine);clear()">Wykonaj</button>
      </div>
    </div>
  </div>

</div>

 </template>

<script>
// @ is an alias to /src

export default {
  name: 'Modal',
  props: {
    firstType: {
      type:String,
      default: 'text',
    },
    secondType: {
      type: String,
      default: 'text'
    }
  },
  methods:{
    clear(){
      this.firstLine='';
      this.secondLine = '';
      $('modal').modal('hide');
    }
  },
  data(){
    return {
      firstLine: '',
      secondLine: '',
    }
  }
};
</script>

