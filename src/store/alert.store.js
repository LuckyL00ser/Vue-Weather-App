
const state = {
  show: false,
  message: '',
  type: '',
  timeout: 4000,
};
const mutations = {
  removeAlert(state) {
    state.show = false;
    state.message = '';
    state.type = '';
  },
  setAlert(state, { message, type }) {
    state.show = true;
    state.message = message;
    state.type = type;
  },

};
const actions = {
  success({ commit }, message) {
    commit('setAlert', { message, type: 'success' });
    setTimeout(() => {
      commit('removeAlert');
    }, state.timeout);
  },
  error({ commit }, message) {
    commit('setAlert', { message, type: 'danger' });
    setTimeout(() => {
      commit('removeAlert');
    }, state.timeout);
  },
  warning({ commit }, message) {
    commit('setAlert', { message, type: 'warning' });
    setTimeout(() => {
      commit('removeAlert');
    }, state.timeout);
  },
  info({ commit }, message) {
    commit('setAlert', { message, type: 'info' });
    setTimeout(() => {
      commit('removeAlert');
    }, state.timeout);
  },
};

export const alert = {
  namespaced: true,
  state,
  mutations,
  actions,
};
