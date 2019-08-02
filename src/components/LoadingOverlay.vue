<template >

<div class="spinner-container" :class="{'spinner-container-visible':loading}" >
        <div class="spinner-border text-primary"  id="spinner"  role="status">
              <span class="sr-only">Pobieranie danych...</span>
          </div>
 
</div>
</template>

<script>

export default {
  name: 'LoadingOverlay',
  props: ['loading'],
 
};
</script>

</template>



<style scoped>


.spinner-container{
    opacity: 0;
    position: absolute;
    width:100%;
    height:100%;        
    top:0;
    left:0;
    background-color:#7D7D7D73;
    transition: 1s opacity, 1s z-index;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    z-index:-1;

}
.spinner-border{
    width:60px;
    height:60px;
    position: relative;
    top:calc(50% - 30px);
    
}


.spinner-container-visible{
    opacity: 1 !important;
    z-index: 1;
    transition: 1s z-index step-start;
}

</style>