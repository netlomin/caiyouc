export default [{
  path: '/test',
  name: 'Test',
  component: () => import('@/views/user/about'),
  meta: {
    title: '测试',
    keepAlive: false
  }
}]
