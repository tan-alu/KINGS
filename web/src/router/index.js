import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: Main,
  children: [{
    path: '/',
    name: 'Home',
    component: Home
  }]
}]

const router = new VueRouter({
  routes
})

export default router
