import Layout from '@/layout/navbar'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/home/combin-order/:id',
    name: 'CombinOrder',
    component: () => import('@/views/home/combin-order'),
    meta: {
      title: '合买详情',
      keepAlive: false
    }
  }, {
    path: '/about',
    name: 'About',
    component: () => import('@/views/user/about'),
    meta: {
      title: '关于我',
      keepAlive: false
    }
  }]
}]
