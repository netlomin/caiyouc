import Index from '@/layout/'
import TabBar from '@/layout/tabbar'

export default [{
  path: '/',
  component: Index,
  meta: {
    title: '彩友圈-合买版',
    keepAlive: false
  },
  children: [{
    path: '/tabbar',
    name: 'TabBar',
    component: TabBar,
    meta: {
      title: '带TabBar页面',
      keepAlive: false
    },
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/'),
      meta: {
        title: '首页',
        keepAlive: false
      }
    }]
  }, {
    path: '/about',
    name: 'About',
    component: () => import('@/views/home/about'),
    meta: {
      title: '关于我',
      keepAlive: false
    }
  }]
}]
