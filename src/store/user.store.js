import axios from 'axios';
import router from '../router';

/*
user: {
  name: 'abc',
  password: '***',
  cities: [...]
}
 */

const logged = localStorage.getItem('logged') || 0;
const readonlyUser = logged ? JSON.parse(localStorage.getItem(logged)) : {};

const state = logged ? {
  user: readonlyUser,
  loggedIn: true,
  userCities: readonlyUser.cities,
 
} : {
  user: null,
  loggedIn: false,
  userCities: [],

};

const mutations = {
  login(state, loggedUser) {
    state.user = loggedUser;
    state.loggedIn = true;
    state.userCities = loggedUser.cities;
  },
  logout(state) {
    state.user = null;
    state.loggedIn = false;
    state.userCities = [];
  },
  updateUserData(state, { name, password }) {
    state.user.name = name;
    state.user.password = password;
  },
  addCity(state, city) {
    state.userCities.push(city);
    state.user.cities = state.userCities;
  },
  removeCity(state, city) {
    state.userCities = state.userCities.filter(element => element.id !== city.id);
    state.user.cities = state.userCities;
  },
  removeAll(state) {
    state.userCities = [];
    state.user.cities = state.userCities;
  },
  updateWeather(state, weather) {
    for (let i = 0; i < weather.length; i++) {
      state.userCities[i].weather = weather[i].main;
      state.userCities[i].weatherIcons = [];
      weather[i].weather.forEach(element => state.userCities[i].weatherIcons.push(element.icon));
    }
  },

};
const actions = {
  register({ dispatch }, { username, argPassword }) {
    const checkExisting = localStorage.getItem(username);

    if (username && argPassword && !checkExisting) {
      const user = {
        name: username,
        password: argPassword,
        cities: [],
      };
      localStorage.setItem(username, JSON.stringify(user));
      dispatch('alert/success', 'Pomyślnie zarejestrowano', { root: true });
      router.push('/login');
    } else if (!checkExisting) { dispatch('alert/error', 'Brak hasła lub loginu', { root: true }); } else { dispatch('alert/error', 'Taki użytkownik już istnieje', { root: true }); }
  },
  deleteAccount({ dispatch }, username) {
    if (localStorage.getItem(username)) {
      localStorage.removeItem(username);
      dispatch('logout');
      dispatch('alert/info', 'Usunięto konto');
    }
    dispatch('alert/error', 'Błąd podczas usuwania konta - nie istnieje', { root: true });
  },
  login({ dispatch, commit }, { username, password }) {
    const user = JSON.parse(localStorage.getItem(username));
    if (user) {
      if (user.password === password) {
        commit('login', user);
        localStorage.setItem('logged', user.name);
        dispatch('alert/success', 'Pomyślnie zalogowano', { root: true });
        router.push('/');
      } else { dispatch('alert/error', 'Błędne hasło', { root: true }); }
    } else { dispatch('alert/error', 'Podany użytkownik nie istnieje', { root: true }); }
  },
  logout({ dispatch, commit }) {
    localStorage.removeItem('logged');
    commit('logout');
    dispatch('alert/info', 'Wylogowano', { root: true });
    router.push('/');
  },
  addCity({ dispatch, commit }, city) {
    commit('addCity', city);
    dispatch('storeUser');
    dispatch('alert/success', 'Dodano miasto', { root: true });
  },
  removeCity({ dispatch, commit }, city) {
    commit('removeCity', city);
    dispatch('storeUser');
    dispatch('alert/warning', 'Usunięto miasto', { root: true });
  },
  removeAll({ dispatch, commit }) {
    commit('removeAll');
    dispatch('storeUser');
    dispatch('alert/warning', 'Usunięto wszystkie miasta', { root: true });
  },
  updateWeather({ dispatch, commit }, weather) {
    commit('updateWeather', weather);
    dispatch('storeUser');
  },
  storeUser() {
    localStorage.setItem(state.user.name, JSON.stringify(state.user));
  },
  updateUserData({ dispatch, commit }, { username, authPassword, newPassword }) {
    if (state.user.password == authPassword) {
      if (localStorage.getItem(username)) {
        dispatch('alert/error', 'Taki użytkownik już istnieje', { root: true });
        return;
      }
      localStorage.removeItem(state.user.name);
      commit('updateUserData', { name: username || state.user.name, password: newPassword || authPassword });
      localStorage.setItem('logged', state.user.name);
      dispatch('storeUser');
      dispatch('alert/success', 'Wprowadzono zmiany', { root: true });
    } else { dispatch('alert/error', 'Błędne hasło', { root: true }); }
  },
  deleteUser({ dispatch, commit }, authPassword) {
    if (authPassword == state.user.password) {
      localStorage.removeItem(state.user.name);
      dispatch('logout');
      dispatch('alert/info', 'Usunięto konto', { root: true });
      router.push('/');
    } else { dispatch('alert/error', 'Błędne hasło', { root: true }); }
  },


};

export const user = {
  namespaced: true,
  state,
  mutations,
  actions,
};
