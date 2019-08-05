<template>
    <div class="row position-relative ">
        
        <div class="card col-12 col-lg-6 mx-auto p-0 shadow-lg mb-auto ">
            <div class="card-body bg-light p-0">
              <h4 class="card-title p-3 mb-0 bg-secondary text-white">Pogoda dla Twoich miast</h4>
              <div class="card-text p-3  position-relative ">                    
              <input-with-list :list="citiesList"  :suggestionNumber="10" inputName="Nazwa miasta" @elementSelected="checkAndAddCity"/>
              <div v-if="userCities.length>0">
                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex align-items-center px-1 px-sm-4 weather-of-city " v-for="city in userCities" :key="city.id" @click="loadCharts(city.id)">
                            <span class="text-nowrap overflow-hidden">{{city.name}}</span>
                            <div class="flex-grow-1">
                                <img class="weather-icon d-sm-block d-none" v-for="icon in city.weatherIcons" :key=icon :src="`http://openweathermap.org/img/wn/${icon}@2x.png`">
                            </div>  
                            <div v-if="city.weather" class="weather-container">
                                <span>{{city.weather.temp}}&deg;C</span>  
                                <span>{{city.weather.humidity}}%</span>  
                            </div>                
                            <button class="btn btn-danger" @click.stop="deleteCity(city)"><i class="far fa-trash-alt"></i></button>
                        </li>
                    </ul>
                    <button class="btn w-100 btn-outline-danger" @click="removeAll">Usuń wszystkie</button>
              </div>
                
                <h6 v-else>
                  Dodaj jakieś miasto...
                </h6>
               <LoadingOverlay :loading="fetching"/>
                </div>
            </div>
            
          </div>
          <weather-charts ref="weatherCharts"  :fetchingChartsData="fetchingChartsData"/>
    </div>
</template>


<script>
import {mapState,mapActions} from 'vuex';
import InputWithList from '../components/InputWithList.vue';
import WeatherCharts from '../components/WeatherCharts.vue';
import LoadingOverlay from '../components/LoadingOverlay.vue';
import axios from 'axios';
import {  setInterval, setTimeout, clearInterval } from 'timers';

export default {
  name: 'Weather',
    components: {InputWithList, WeatherCharts,LoadingOverlay},
  data(){
    return{
        apikey: '05f5cd33a78f26982b46071600c01ff6',
        weatherData: [],
        fetching:false,
        updateFrequency: 30000,
        timer: null,
        citiesList: [],
        fetchingChartsData: false,     
        currentCity:null
    }
  },
  beforeDestroy(){
      clearInterval(this.timer);
  },
  computed:{
     ...mapState('user',['userCities'])
  },
  created(){      
      axios.get('./static/miastaPL.json')
      .then(data=>this.citiesList=data.data)
      .catch(error=>this.error('Błąd wczytywania listy miast'));
      this.fetchWeather();
      this.timer = setInterval(this.fetchWeather,this.updateFrequency);
  },

  methods: {
      ...mapActions('user',['addCity','removeCity','removeAll','updateWeather']),
      ...mapActions('alert',['error','warning']),
      fetchWeather(){          
        
          if(this.userCities.length>0){
              this.fetching=true;
              let citiesIDs='';
              this.userCities.forEach(city=>citiesIDs+=city.id+',');
              citiesIDs=citiesIDs.slice(0,-1);            
              axios.get(`https://api.openweathermap.org/data/2.5/group?id=${citiesIDs}&APPID=${this.apikey}&units=metric`)
              .then(
                  data=>{
                      this.weatherData=data.data.list;  
                      this.updateWeather(this.weatherData);                                          
                  })
              .catch(error=>this.error(error))
              
          }
          setTimeout(()=>this.fetching=false,1000);
      },     
      fetchCurrentylAdded(city){
          this.fetching=true;
          axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=${this.apikey}&units=metric`)
              .then(
                  data=>{                  
                      this.weatherData.push(data.data);
                      this.updateWeather(this.weatherData);                                          
                  })
              .catch(error=>this.error(error))
              .finally(()=>setTimeout(()=>this.fetching=false,1000));
            this.loadCharts(city.id);
          
      },
      checkAndAddCity(city){
          if(this.userCities.some(element=>element.id==city.id))
            this.warning('Wyrabne miasto jest już na liście')
          else{
            this.addCity(city);
            this.fetchCurrentylAdded(city);
          }
      },
      deleteCity(city){
          this.currentCity=null;
          this.$refs.weatherCharts.hideCharts();
          this.removeCity(city);
      },
      loadCharts(cityID){
          this.fetchingChartsData=true;
          this.$refs.weatherCharts.showCharts();
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${this.apikey}&units=metric`)
          .then(
              data=>{                  
                  this.$refs.weatherCharts.drawCharts(data.data);  
                  this.currentCity=cityID;               
              })
            .catch(error=>this.error(error))
            .finally(()=>this.fetchingChartsData=false,1000);
      }
      
  },
 

};
</script>

<style scoped>

.weather-of-city{
    background-color: #E1E2E1;
    cursor:pointer;
    transition:0.2s ease;
}
.weather-of-city:hover{
    background-color:whitesmoke;
    font-size:1.1em;
    padding-top: 1rem;
    padding-bottom: 1rem;
    box-shadow: 0 0 15px gray;
}
.weather-container{
    width:120px;
    text-align: right;
    margin-right:6px;
    
}
.weather-container span{
    margin-left:12px;
    white-space: nowrap;
}
.weather-icon{
    height:40px;
    float:right;
}

</style>