import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert.store';
import { user } from './user.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    user,
  },
});
