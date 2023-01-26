import Layout from '@/layout/navbar'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('@/views/user/info'),
    meta: {
      title: '个人信息',
      keepAlive: false
    }
  }, {
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
    path: '/user/ticket-list/:buyId',
    name: 'TicketList',
    component: () => import('@/views/user/ticket-list'),
    meta: {
      title: '彩票列表',
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
    path: '/user/shop-join',
    name: 'JoinShop',
    component: () => import('@/views/user/shop-join'),
    meta: {
      title: '扫码添加彩店',
      keepAlive: false
    }
  }]
}]
