import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import UnknownPage from './views/UnknownPage.vue';
import Register from './views/Register.vue';
import Weather from './views/Weather.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

    },
    {
      path: '/login',
      name: 'login',
      component: Login,

    },

    {
      path: '/register',
      name: 'Register',
      component: Register,

    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather,

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,

    },
    {
      path: '*',
      name: 'UknownPage',
      component: UnknownPage,

    },


  ],
});


export default router;
