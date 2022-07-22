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
    path: '/home/combin-buy-result/:id',
    name: 'CombinResult',
    component: () => import('@/views/home/combin-buy-result'),
    meta: {
      title: '申购结果',
      keepAlive: false
    }
  }, {
    path: '/user/co-buy-list',
    name: 'CoBuyList',
    component: () => import('@/views/user/co-buy-list'),
    meta: {
      title: '我的合买',
      keepAlive: false
    }
  }, {
    path: '/user/settings',
    name: 'Settings',
    component: () => import('@/views/user/settings'),
    meta: {
      title: '系统',
      keepAlive: false
    }
  }]
}]
