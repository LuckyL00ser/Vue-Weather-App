<template>
    <div class="row">
        
        <div class="card col-12 col-md-6 mx-auto p-0 shadow-lg">
            <div class="card-body p-0">
              <h4 class="card-title p-3 mb-0 bg-secondary text-white">Pogoda dla Twoich miast</h4>
              <div class="card-text p-3  position-relative ">                    
              <input-with-list :list="citiesList"  :suggestionNumber="10" inputName="Nazwa miasta" @elementSelected="checkAndAddCity"/>
              <div v-if="userCities.length>0">
                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex align-items-center px-1 px-sm-4" v-for="city in userCities" :key="city.id">
                            <span class="text-nowrap">{{city.name}}</span>
                            <div class="flex-grow-1">
                                <img class="weather-icon" v-for="icon in city.weatherIcons" :key=icon :src="`http://openweathermap.org/img/wn/${icon}@2x.png`">
                            </div>  
                            <div v-if="city.weather" class="weather-container">
                                <span>{{city.weather.temp}}&deg;C</span>  
                                <span>{{city.weather.humidity}}%</span>  
                            </div>                
                            <button class="btn btn-danger" @click="removeCity(city)"><i class="far fa-trash-alt"></i></button>
                        </li>
                    </ul>
                    <button class="btn w-100 btn-outline-danger" @click="removeAll">Usuń wszystkie</button>
              </div>
                
                <h6 v-else>
                  Dodaj jakieś miasto...
                </h6>
                <div class="spinner-container" :class="{'spinner-container-visible':fetching}" >
                    <div class="spinner-border text-primary"  id="spinner"  role="status">
                     <span class="sr-only">Aktualizacja danych...</span>
                </div>
                </div>
                </div>
            </div>
            
          </div>
    </div>
</template>


<script>
// @ is an alias to /src
import {mapState,mapActions} from 'vuex';
//import list from '../../public/citiesIDs.json';
import InputWithList from '../components/InputWithList.vue';
import axios from 'axios';
import {  setInterval, setTimeout, clearInterval } from 'timers';

export default {
  name: 'Weather',
    components: {InputWithList},
  data(){
    return{
        apikey: '05f5cd33a78f26982b46071600c01ff6',
        weatherData: [],
        fetching:false,
        updateFrequency: 30000,
        timer: null,
        citiesList: [],
        publicPath: process.env.BASE_URL,
      
    }
  },
  beforeDestroy(){
      clearInterval(this.timer);
  },
  computed:{
     ...mapState('user',['userCities'])
  },
  created(){
      
      axios.get('/static/citiesIDs.json')
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
              axios.get(`http://api.openweathermap.org/data/2.5/group?id=${citiesIDs}&APPID=${this.apikey}&units=metric`)
              .then(
                  data=>{
                      this.weatherData=data.data.list;  
                      this.updateWeather(this.weatherData);                                          
                  })
              .catch(error=>this.error(error))
              
          }
          this.finalizeFetching();
      },
      finalizeFetching(){
          setTimeout(()=>this.fetching=false,1000);
      },
      fetchCurrentylAdded(city){
          this.fetching=true;
          axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=${this.apikey}&units=metric`)
              .then(
                  data=>{                  
                      this.weatherData.push(data.data);
                      this.updateWeather(this.weatherData);                                          
                  })
              .catch(error=>this.error(error))
              .finally(this.finalizeFetching);
          
      },
      checkAndAddCity(city){
          if(this.userCities.some(element=>element.id==city.id))
            this.warning('Wyrabne miasto jest już na liście')
          else{
            this.addCity(city);
            this.fetchCurrentylAdded(city);
          }
      },
      
  },
 

};
</script>

<style scoped>

.card-text li{
    background-color:lightgray;
}
.weather-container{
    width:140px;
    text-align: center;
    
}
.weather-container span{
    margin-right:12px;
}
.weather-icon{
    height:40px;
    float:right;
}
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
@keyframes jump-z-index {
    0% {
        z-index:1
    }
    99%{
        z-index:1
    }
    100%{
        z-index:0;
    }
}

.spinner-container-visible{
    opacity: 1 !important;
    z-index: 1;
}
</style>