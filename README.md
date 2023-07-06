# caiyouc

彩票选号预约工具（vant2.0 + java）。

#### 开发说明
--- 
##### 环境安装
- nodejs:  v16.15.0
- npm: v8.5.5

##### 项目目录

```
├── public  ------------------------------ 静态文件夹
|  ├── lib  ------------------------------ 工具库
|  ├── static  --------------------------- 静态资源
|  ├── extraConfig.json  ----------------- 部署配置项
|  └── index.html  ----------------------- index.html
├── node_modules  ------------------------ 依赖
├── src  --------------------------------- 开发目录
|  ├── assets  --------------------------- 资源目录
|  |  ├── config  ------------------------ 项目插件配置
|  |  ├── images  ------------------------ 图片(无需动态替换)
|  |  └── css  --------------------------- 共用样式
|  ├── components  ----------------------- 组件库
|  |  └── xxx.vue  ----------------------- 其他组件
|  ├── layout      ----------------------- 布局
|  |  └── xxx.vue  ----------------------- 布局组件
|  ├── store  ---------------------------- vuex配置
|  ├── utils  ---------------------------- 公共方法
|  ├── plugins  -------------------------- vant插件按需全局引入
|  ├── filers  --------------------------- filers
|  ├── router  --------------------------- vue-router
|  |  └── modules
|  |  └── index.js
|  ├── services  ------------------------- 接口
|  |  ├── api.js  ------------------------ 统一接口
|  ├── views  ---------------------------- 业务视图(按模块命名)
|  ├── App.vue
|  └── main.js
├── .env  -------------------------------- 本地环境变量配置
├── .eslintrc.js  ------------------------ eslint配置
├── .eslintignore  ----------------------- eslint忽略文件
├── .gitgnore  --------------------------- git忽略文件
├── .postcssrc.js  ----------------------- rem适配配置
├── .prettierrc  ------------------------- pettier规则
├── .babel.config.js  -------------------- babel配置
├── yarn.lock  --------------------------- yarn依赖版本锁定文件
├── package-lock.json  ------------------- npm依赖版本锁定文件
├── package.json
├── vue.config.js  ----------------------- webpack配置
└── README.md
```

##### 环境变量配置说明


```
VUE_APP_ENV = 'development' // 环境标识
VUE_APP_DEBUG=true // 调试模式配置，生产环境设为false
VUE_APP_API_SERVER= // 接口地址
...
```

_注意：环境变量配置的增删改由前端团队评审确定之后方可使用，切勿私自添加，通过之后同步至运维团队，避免部署因环境变量信息不对称发生问题_

##### extraconfig 部署配置

```
// json format
{
  "VUE_APP_SERVER":""
}
```

_注意：检查运维部署至现场的配置文件格式，避免因格式问题造成低级错误_

#### 开始开发

##### git 拉取


1. 开发分支： dev
2. 自己的分支： 例如 yourname/dev
3. 合并流程： 获取主开发分支 dev、将 主开发分支 dev 合并到自己的 dev
4. 提交流程：提交自己的 dev、到 git 网页提交合并申请
5. 注意：每次改自己代码之前，先将 主分支 dev 拉取合并，不然冲突太多

##### 本地项目启动

```
1. npm install
2. npm run dev
```

##### vuex

默认使用 vuex-persistedstate 进行持久化存储
