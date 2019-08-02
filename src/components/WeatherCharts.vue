<template>
  <div class="col-lg-5 card px-0 shadow-lg" :class="{'show':show}" id="charts">
      <div  class="text-white card-title bg-secondary p-3 mb-0">
          <h4 class="my-0 align-middle pl-1" >{{cityName||'Prognoza pogody'}}</h4>            
      </div>
      <p v-if="!chartsData" id="charts-alt" >Wybierz jakieś miasto</p>
       <div id="charts-container" :hidden="!chartsData" class="card-body text-left">
         
          <h4><i class="fas fa-thermometer-half mr-2"></i>Temperatura</h4>
          <div class="canvas-container">
              <canvas id="temperature"></canvas>
          </div>
          
          <h4><i class="fas fa-tint mr-2"></i>Wilgotność</h4>
           <div class="canvas-container">
              <canvas id="humidity"></canvas>
          </div>
        
      </div>
      
       <div class="d-block d-lg-none bg-primary" id="close-charts-btn" @click="show=!show">
            <i class="fas fa-chevron-left"></i>
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
          this.chartsData=null;
          if(this.tempChart && this.humChart){
            this.tempChart.destroy();
            this.humChart.destroy();
          }
          this.humChart=null;
          this.tempChart=null;          
          this.cityName='';
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
                timestamps.push(new Date(element.dt_txt).toISOString());
                
               
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
                        borderWidth: 2,                        
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display:false
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperatura [°C]'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            scaleLabel: {
                                display: true,
                                labelString: 'Dzień'
                            },
                            time: {
                                unit: 'day',
                                unitStepSize:1,
                                displayFormats:{
                                    day: 'DD-MM'
                                },
                                tooltipFormat: 'ddd YYYY-MM-DD, kk:mm'
                                
                               
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
                        label: 'Wilgotność',
                        data: preparedData.humidity,
                    
                        borderColor: '#0db1ae',
                        borderWidth: 2,                        
                    }]
                },
                 options: {
                    
                    maintainAspectRatio: false,
                    legend: {
                        display:false
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Wilgotność [%]'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            scaleLabel: {
                                display: true,
                                labelString: 'Dzień'
                            },
                            time: {
                                unit: 'day',
                                unitStepSize:1,
                                displayFormats:{
                                    day: 'DD-MM'
                                },
                                tooltipFormat: 'ddd YYYY-MM-DD, kk:mm'
                                
                               
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
    transition: 1s right ease-in; 
    z-index:5;   
    max-height: calc(100vh - 56px - 2rem);   
    min-height: 60vh;
 
}

@include media-breakpoint-down(md){
    #charts{
        top: calc(56px + 1rem);
        right:calc(-100% + 45px);
        position: fixed;
        height:calc(100vh - 56px - 2rem);
        width:calc(100% - 10px);
    }
    #charts-container{
        padding-right:2rem;
    }
    #charts.show{
    right:-20px;
    }
}

@include media-breakpoint-down(sm){
    #charts{
        right: calc(-100% + 30px) ;
    }
    #close-charts-btn{
        width:45px !important;
        height:45px !important;
        font-size:33px !important;
        left:-20px !important;
    }
    
}
#charts-alt{
    position:absolute;
    top:50%;
    width:100%;
    text-align:center;
}
#charts:not(.show) #charts-container, #charts-container.hide{
    opacity: 0;    
}
#charts-container{
    height:100%;
    opacity:1;   
    transition: 1s opacity ease;
    display: flex;
    flex-direction: column;


}

.canvas-container{ 
    height:100%;
    width:100%;
    flex-grow: 1;
    min-height:100px;
}
canvas{
    
}


.spinner-container{
    
    border-radius: 1rem;
}

#close-charts-btn{
    font-size:40px;
    color:white;
    padding: 0;
    width:60px;
    height:60px;
    position:absolute;
    left:-30px;
    top:calc(50% - 35px);
    cursor:pointer;
    border-radius: 100%;
    border:none !important;
}

#close-charts-btn i{
    transition-duration: 1s ;
    margin-left:-6px;
}
.show #close-charts-btn i{
    transform: rotate(180deg);
    margin-left:6px;
    
}

</style>
