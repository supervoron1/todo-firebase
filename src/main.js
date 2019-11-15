import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(firestorePlugin);

firebase.initializeApp({
  projectId: "todo-app-e0f9d",
  databaseURL: "https://todo-app-e0f9d.firebaseio.com"
});

export const db = firebase.firestore();


new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
