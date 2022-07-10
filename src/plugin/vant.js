// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  Cell,
  CellGroup,
  Col,
  CountDown,
  Divider,
  Empty,
  Grid,
  GridItem,
  Icon,
  List,
  NavBar,
  PullRefresh,
  Row,
  Stepper,
  SubmitBar,
  Tabbar,
  TabbarItem
} from 'vant'

Vue.use(Button)
Vue.use(Cell).use(CellGroup)
Vue.use(CountDown)
Vue.use(Col).use(Row)
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Grid).use(GridItem)
Vue.use(Icon)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(NavBar)
Vue.use(Stepper)
Vue.use(SubmitBar)
Vue.use(Tabbar).use(TabbarItem)
