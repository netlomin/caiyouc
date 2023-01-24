import Vue from 'vue'
import Router from 'vue-router'
import TabBarRouter from './tabbar/'
import NavBarRouter from './navbar/'
import ViewsRouter from './views/'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...ViewsRouter, ...TabBarRouter, ...NavBarRouter]
})

export default router
