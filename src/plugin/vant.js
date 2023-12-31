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
  Dialog,
  Divider,
  Empty,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  Image,
  ImagePreview,
  List,
  NavBar,
  NoticeBar,
  Notify,
  Overlay,
  Popup,
  PullRefresh,
  Radio,
  RadioGroup,
  Row,
  Stepper,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeItem,
  Switch,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  TreeSelect
} from 'vant'

Vue.use(Cell).use(CellGroup)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Collapse).use(CollapseItem)
Vue.use(CountDown)
Vue.use(Col).use(Row)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Form).use(Field)
Vue.use(Grid).use(GridItem)
Vue.use(Icon)
Vue.use(Image)
Vue.prototype.ImagePreview = ImagePreview
Vue.use(List)
Vue.use(NavBar)
Vue.use(NoticeBar)
Vue.use(Notify)
Vue.use(Overlay)
Vue.use(Popup)
Vue.use(PullRefresh)
Vue.use(RadioGroup).use(Radio)
Vue.use(Stepper)
Vue.use(Sticky)
Vue.use(SubmitBar)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Switch)
Vue.use(Tabs).use(Tab)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Tag)
Vue.use(Toast)
Vue.use(TreeSelect)