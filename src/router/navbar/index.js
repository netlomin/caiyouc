import Layout from '@/layout/navbar'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/home/co-buy-sub/:id',
    name: 'CoBuySub',
    component: () => import('@/views/home/co-buy-sub'),
    meta: {
      title: '合买详情',
      keepAlive: false
    }
  }, {
    path: '/home/sub-buy-result',
    name: 'SubBuyResult',
    component: () => import('@/views/home/sub-buy-result'),
    meta: {
      title: '认购结果',
      keepAlive: false
    }
  }, {
    path: '/user/co-buy',
    name: 'CoBuy',
    component: () => import('@/views/user/co-buy'),
    meta: {
      title: '发起合买',
      keepAlive: false
    }
  }, {
    path: '/home/buy-result',
    name: 'BuyResult',
    component: () => import('@/views/user/buy-result'),
    meta: {
      title: '提交结果',
      keepAlive: false
    }
  }, {
    path: '/user/buy-list',
    name: 'BuyList',
    component: () => import('@/views/user/buy-list'),
    meta: {
      title: '我的代购',
      keepAlive: false
    }
  }, {
    path: '/user/buy-detail/:id',
    name: 'BuyDetail',
    component: () => import('@/views/user/buy-detail'),
    meta: {
      title: '代购详情',
      keepAlive: false
    }
  }, {
    path: '/user/cart',
    name: 'Cart',
    component: () => import('@/views/user/cart'),
    meta: {
      title: '选号篮',
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
  }, {
    path: '/user/password',
    name: 'Password',
    component: () => import('@/views/user/password'),
    meta: {
      title: '设置密码',
      keepAlive: false
    }
  }, {
    path: '/user/join-shop',
    name: 'JoinShop',
    component: () => import('@/views/user/join-shop'),
    meta: {
      title: '扫码添加彩店',
      keepAlive: false
    }
  }]
}]
