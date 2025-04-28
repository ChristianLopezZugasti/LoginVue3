// src/store/index.js
import { createStore } from 'vuex';  // Importar createStore desde vuex
import sharedModule from '@/modules/auth/store';

export default createStore({
  modules: {
    shared: sharedModule
  },
  state: {
    showAlert: false,
    isLoading: false,
    dataAlert: {},
  },
  getters: {
    getShowAlert(state) {
      return state.showAlert;
    },
    getDataAlert(state) {
      return state.dataAlert;
    },
  },
  mutations: {
    setAlert(state, values) {
      state.showAlert = values;
    },
    setDataAlert(state, values) {
      state.dataAlert = values;
    },
    setLoading(state, values) {
      state.isLoading = values;
    },
  },
  actions: {
    // Aquí agregarías las acciones si las necesitas
  }
});
