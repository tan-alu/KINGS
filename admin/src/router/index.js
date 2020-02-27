import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'main',
  component: Main,
  children: [{
    path: '/categories/create',
    component: CategoryEdit
  }, {
    path: '/categories/list',
    component: CategoryList
  }, {
    path: '/categories/edit/:id',
    props: true,
    component: CategoryEdit
  }, {
    path: '/items/create',
    component: ItemEdit
  }, {
    path: '/items/list',
    component: ItemList
  }, {
    path: '/items/edit/:id',
    props: true,
    component: ItemEdit
  }, {
    path: '/heroes/create',
    component: HeroEdit
  }, {
    path: '/heroes/list',
    component: HeroList
  }, {
    path: '/heroes/edit/:id',
    props: true,
    component: HeroEdit
  }]
}]

const router = new VueRouter({
  routes
})

export default router
