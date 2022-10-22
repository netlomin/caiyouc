export default [{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login'),
  meta: {
    title: '注册登录',
    keepAlive: false
  }
}, {
  path: '/user/pick',
  name: 'Pick',
  component: () => import('@/views/user/pick'),
  meta: {
    title: '选号',
    keepAlive: false
  }
}, {
  path: '/user/select-shop',
  name: 'SelectShop',
  component: () => import('@/views/user/select-shop'),
  meta: {
    title: '切换彩店',
    keepAlive: false
  }
}]
