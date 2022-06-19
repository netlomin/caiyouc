// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  Cell,
  List,
  NavBar,
  Tabbar,
  TabbarItem
} from 'vant'

Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(NavBar)
Vue.use(Tabbar).use(TabbarItem)
