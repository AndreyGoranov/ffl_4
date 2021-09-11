import Vue from "vue";
import Vuex from "vuex";
import rounds from "./modules/rounds";
import seasons from "./modules/seasons";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { rounds, seasons },
});
