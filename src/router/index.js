import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RenderList from "../components/RenderList";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/page',
      component: RenderList
    }
  ],
  mode: 'history'
})
