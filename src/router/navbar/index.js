import Layout from '@/layout/navbar'

export default [{
  path: '/',
  component: Layout,
  meta: {
    title: '--',
    keepAlive: false
  },
  children: [{
    path: '/about',
    name: 'About',
    component: () => import('@/views/user/about'),
    meta: {
      title: '关于我',
      keepAlive: false
    }
  }]
}]
