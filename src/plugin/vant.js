// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  CountDown,
  Divider,
  Empty,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  List,
  NavBar,
  Popup,
  PullRefresh,
  Row,
  Stepper,
  SubmitBar,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Toast,
  TreeSelect
} from 'vant'

Vue.use(Cell).use(CellGroup)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Collapse).use(CollapseItem)
Vue.use(CountDown)
Vue.use(Col).use(Row)
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Form).use(Field)
Vue.use(Grid).use(GridItem)
Vue.use(Icon)
Vue.use(List)
Vue.use(Popup)
Vue.use(PullRefresh)
Vue.use(NavBar)
Vue.use(Stepper)
Vue.use(SubmitBar)
Vue.use(Tabs).use(Tab)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Toast)
Vue.use(TreeSelect)
