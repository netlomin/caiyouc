// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  Cell,
  CellGroup,
  CountDown,
  Divider,
  Empty,
  Icon,
  List,
  NavBar,
  PullRefresh,
  Tabbar,
  TabbarItem
} from 'vant'

Vue.use(Button)
Vue.use(Cell).use(CellGroup)
Vue.use(CountDown)
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Icon)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(NavBar)
Vue.use(Tabbar).use(TabbarItem)
