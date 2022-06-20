import Layout from '@/layout/tabbar'

export default [{
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    title: '--',
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
}]
