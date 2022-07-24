export default [{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login'),
  meta: {
    title: '注册登录',
    keepAlive: false
  }
}]
