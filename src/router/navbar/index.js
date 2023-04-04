import Layout from '@/layout/navbar'

export default [{
  path: '/',
  component: Layout,
  redirect: '/start',
  children: [{
    path: '/start',
    name: 'Start',
    component: () => import('@/views/start'),
    meta: {
      title: '启动页',
      keepAlive: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '注册登录',
      keepAlive: true
    }
  }, {
    path: '/user/pick',
    name: 'Pick',
    component: () => import('@/views/user/pick'),
    meta: {
      title: '选号',
      keepAlive: true
    }
  }, {
    path: '/user/shop-select',
    name: 'ShopSelect',
    component: () => import('@/views/user/shop-select'),
    meta: {
      title: '选择彩站',
      keepAlive: true
    }
  }, {
    path: '/user/agreement',
    name: 'Agreement',
    component: () => import('@/views/user/agreement'),
    meta: {
      title: '用户协议',
      keepAlive: true,
      nav: true
    }
  }, {
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('@/views/user/info'),
    meta: {
      title: '个人信息',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/act-withdraw',
    name: 'ActWithdraw',
    component: () => import('@/views/user/act-withdraw'),
    meta: {
      title: '清账',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/act-extract',
    name: 'ActExtract',
    component: () => import('@/views/user/act-extract'),
    meta: {
      title: '提取收益',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/act-details',
    name: 'ActDetails',
    component: () => import('@/views/user/act-details'),
    meta: {
      title: '我的账本',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/act-profits',
    name: 'ActProfits',
    component: () => import('@/views/user/act-profits'),
    meta: {
      title: '收益明细',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/home/co-buy-sub/:id',
    name: 'CoBuySub',
    component: () => import('@/views/home/co-buy-sub'),
    meta: {
      title: '合买详情',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/home/sub-buy-result',
    name: 'SubBuyResult',
    component: () => import('@/views/home/sub-buy-result'),
    meta: {
      title: '认购结果',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/co-buy',
    name: 'CoBuy',
    component: () => import('@/views/user/co-buy'),
    meta: {
      title: '发起合买',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/home/buy-result',
    name: 'BuyResult',
    component: () => import('@/views/user/buy-result'),
    meta: {
      title: '提交结果',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/buy-list',
    name: 'BuyList',
    component: () => import('@/views/user/buy-list'),
    meta: {
      title: '我的彩单',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/ticket-list/:buyId',
    name: 'TicketList',
    component: () => import('@/views/user/ticket-list'),
    meta: {
      title: '彩票列表',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/buy-detail/:id',
    name: 'BuyDetail',
    component: () => import('@/views/user/buy-detail'),
    meta: {
      title: '自购详情',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/cart',
    name: 'Cart',
    component: () => import('@/views/user/cart'),
    meta: {
      title: '选号篮',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/settings',
    name: 'Settings',
    component: () => import('@/views/user/settings'),
    meta: {
      title: '系统',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/password',
    name: 'Password',
    component: () => import('@/views/user/password'),
    meta: {
      title: '设置密码',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/shop-join',
    name: 'JoinShop',
    component: () => import('@/views/user/shop-join'),
    meta: {
      title: '扫码添加彩站',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/shop',
    name: 'Shop',
    component: () => import('@/views/user/shop'),
    meta: {
      title: '彩站信息',
      keepAlive: false,
      nav: true
    }
  }, {
    path: '/user/invite',
    name: 'Invite',
    component: () => import('@/views/user/invite'),
    meta: {
      title: '推广邀请',
      keepAlive: false,
      nav: true
    }
  }]
}]