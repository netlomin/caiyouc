import $cp from '@/utils/cp'

const getters = {
  token: state => state.app.token,
  userId: state => state.app.userId,
  passportId: state => state.app.passportId,
  shopId: state => state.app.shopId,
  cart: state => _.cloneDeep(state.cp.cart),
  play: state => state.cp.play
}
export default getters
