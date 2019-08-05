<template>
      <form class="mb-4 position-relative">                 
                <input v-model="name" @keyup="findMatching(name)" @focus="focusedInput=true" @blur="focusedInput=hover|false" class="form-control" :placeholder="inputName">                 
                 <ul class="list-group" id="suggestionList" v-if="focusedInput||hover" @mouseover="hover=true" @mouseleave="hover=false">
                    <li class="list-group-item list-group-item-action" v-for="suggestion in suggestedElements"  
                    :key="suggestion.id" @click="elementSelected(suggestion,false)">
                        {{suggestion.name}}
                   <div class="text-success" >
                       <i class="fas fa-plus"></i>
                   </div>
                   </li>
                </ul>            
              </form>
</template>


<script>

import InputWithList from '../components/InputWithList.vue';

export default {
  name: 'InputWithList',
  props: {
    //  elements: Array,    
      suggestionNumber: Number,
      inputName: String,
      list: Array,

  },
  data(){
      return{
          name: '',
          suggestedElements: [],
          focusedInput: false,
          hover:false,
      }
  },
  methods:{
      findMatching(phrase){
          if(phrase.length<3)              
            this.suggestedElements= [];
          else{
            const reg = new RegExp(`(${phrase})`,'gi');          
            this.suggestedElements= this.$props.list.filter(element=>element.name.match(reg)).splice(0,this.suggestionNumber);
          }        
      },    
      elementSelected(element,disableFocus){          
          this.name=element.name;
          this.name='';
          this.$emit('elementSelected',element);         
            this.focusedInput=false;
            this.hover=disableFocus;
      },
     
  }  
};
</script>

<style scoped>
#suggestionList{
    position: absolute;
    top:38px;
    left:0;
    width:100%; 
    z-index: 1;  
}
#suggestionList li{
    height:38px;
    padding:0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    
}
#suggestionList li:first-child{
     border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
#suggestionList li:hover{
    background-color: whitesmoke;
}
button{
  padding: 0.01rem 0.45rem;
  font-size:20px !important;
  border-radius: 25% !important;
}
button:hover{
  background:unset;
}

</style>