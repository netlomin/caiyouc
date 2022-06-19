import Vue from 'vue'
import Router from 'vue-router'
import layoutRouter from './layout/'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [...layoutRouter]
})

export default router
