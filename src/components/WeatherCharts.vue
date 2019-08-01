<template>
  <div class="position-fixed col-lg-5 card px-0 shadow-lg" :class="{'show':show}" id="charts">
      <div class="card-title text-white p-3 bg-secondary">
          <h4 class="d-inline-block " >{{cityName}}</h4>
            <button class="btn d-inline-block" @click="hideCharts">
                <i class="far fa-times-circle"></i>
            </button>
      </div>
      
      <div class="card-body text-left">
          <h3 >Temperatura</h3>
          <canvas id="temperature"></canvas>
          <span class="divider"></span>
          <h3 >Wilgotność</h3>
          <canvas id="humidity"></canvas>
      </div>
      <lodading-overlay :loading="fetchingChartsData"/>
  </div>
</template>

<script>
import Chart from 'chart.js';
import LodadingOverlay from './LoadingOverlay.vue';

export default {
  name: 'WeatherCharts',
  props: ['fetchingChartsData'],
  components: {LodadingOverlay},
  data(){
      return{
          show: false,
          chartsData: null,
          cityName: '',
          tempChart: null,
          humChart: null,
      }
  },
  beforeDestroy(){
      this.tempChart.destroy();
      this.humChart.destroy();
  },
  methods:{
      showCharts(){
          this.show=true;
      },
      hideCharts(){
          this.show=false;
      },
      updateCharts(data){
          const preparedData = this.prepareData(data);
          this.tempChart.data.datasets[0].data=preparedData.temperature;
          this.tempChart.data.labels=preparedData.labels;
          this.tempChart.update();

          this.humChart.data.datasets[0].data=preparedData.humidity;
          this.humChart.data.labels=preparedData.labels;
          this.humChart.update();
      },
      prepareData(data){
            this.chartsData = data;
            this.cityName=data.city.name;
            let tempData=[];
            let humData=[];
            let timestamps=[];           
            this.chartsData.list.forEach(element=>{
                tempData.push(element.main.temp);
                humData.push(element.main.humidity);
                timestamps.push(element.main.dt_txt);
            });
            return{
                temperature: tempData,
                humidity: humData,
                labels: timestamps
            }
      },
      drawCharts(data){
          if(this.tempChart && this.humChart){
              this.updateCharts(data);
              return;
          }          
          const tempCanvas = $('#temperature');
          const humCanvas = $('#humidity');
          const preparedData = this.prepareData(data);

          this.tempChart = new Chart(tempCanvas,{
                type: 'line',
                data: {
                    labels: preparedData.labels,
                    datasets: [{
                        label: 'Temperatura',
                        data: preparedData.temperature,
                        
                        borderColor: '#dc3545',
                        borderWidth: 1,                        
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
                });

            this.humChart = new Chart(humCanvas,{
                type: 'line',
                data: {
                    labels: preparedData.labels,
                    datasets: [{
                        label: 'Temperatura',
                        data: preparedData.humidity,
                    
                        borderColor: '#007bff',
                        borderWidth: 1,                        
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
                });    
            
        }
  }
    
 
};
</script>

<style scoped lang="scss">
@import '../assets/custom.scss';

#charts{
    top: 0;
    right:-50%;
    transition: 1s right ease-in; 
    z-index:5;
}
@include media-breakpoint-up(lg) { 
    #charts{
        position:relative !important;
        right: unset;
    }
}

#charts.show{
    right:20px;
}
canvas{
    width:300px;
    height:300px;
}
.divider{
    width:100%;
    height:1px;
    background-color: lightgray;
    border-bottom: solid 2px gray;
    margin: 0.25rem 0;
}
.spinner-container{
    
    border-radius: 1rem;
}
.spinner-container-visible{
    z-index: 1 !important;
}
</style>
