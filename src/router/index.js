import Vue from 'vue'
import Router from 'vue-router'
import TabBarRouter from './tabbar/'
import NavBarRouter from './navbar/'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...NavBarRouter, ...TabBarRouter]
})

export default router
