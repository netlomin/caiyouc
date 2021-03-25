import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './modules/home'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...homeRouter]
})

export default router
