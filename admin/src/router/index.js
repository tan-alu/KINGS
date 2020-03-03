import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

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
  }, {
    path: '/articles/create',
    component: ArticleEdit
  }, {
    path: '/articles/list',
    component: ArticleList
  }, {
    path: '/articles/edit/:id',
    props: true,
    component: ArticleEdit
  }, {
    path: '/ads/create',
    component: AdEdit
  }, {
    path: '/ads/list',
    component: AdList
  }, {
    path: '/ads/edit/:id',
    props: true,
    component: AdEdit
  }, {
    path: '/admin_users/create',
    component: AdminUserEdit
  }, {
    path: '/admin_users/list',
    component: AdminUserList
  }, {
    path: '/admin_users/edit/:id',
    props: true,
    component: AdminUserEdit
  }]
}]

const router = new VueRouter({
  routes
})

export default router
