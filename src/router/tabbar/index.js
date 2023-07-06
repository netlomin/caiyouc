import Layout from '@/layout/tabbar'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/home/index',
    name: 'Home',
    component: () => import('@/views/common/user-view'),
    meta: {
      title: '大厅',
      keepAlive: false
    }
  }, {
    path: '/user/index',
    name: 'User',
    component: () => import('@/views/common/user-view'),
    meta: {
      title: '我的',
      keepAlive: false
    }
  }]
}]