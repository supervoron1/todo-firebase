import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'


Vue.use(Vuex);
/*
  создание Vuex, передача необходимого(ых) модулей
 */
export default new Vuex.Store({
  modules: {
    list
  }
})
