export default [{
  path: '/start',
  name: 'Start',
  component: () => import('@/views/start'),
  meta: {
    title: '启动页',
    keepAlive: false
  }
}, {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login'),
  meta: {
    title: '注册登录',
    keepAlive: false
  }
}, {
  path: '/user/agreement',
  name: 'Agreement',
  component: () => import('@/views/user/agreement'),
  meta: {
    title: '用户协议',
    keepAlive: false
  }
},{
  path: '/user/pick',
  name: 'Pick',
  component: () => import('@/views/user/pick'),
  meta: {
    title: '选号',
    keepAlive: false
  }
}, {
  path: '/user/shop-select',
  name: 'ShopSelect',
  component: () => import('@/views/user/shop-select'),
  meta: {
    title: '选择彩店',
    keepAlive: false
  }
}]
