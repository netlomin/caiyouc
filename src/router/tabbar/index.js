import Layout from '@/layout/tabbar'

export default [{
  path: '/',
  component: Layout,
  redirect: '/start',
  children: [{
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/'),
    meta: {
      title: '大厅',
      keepAlive: false
    }
  }, {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/'),
    meta: {
      title: '用户',
      keepAlive: false
    }
  }]
}]
