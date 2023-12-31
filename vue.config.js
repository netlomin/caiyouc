'use strict'
const pkg = require('./package.json')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = dir => path.join(__dirname, dir)
// page title
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// externals
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  lodash: '_',
  localforage: 'localforage',
  axios: 'axios',
  'vue-router': 'VueRouter',
  dayjs: 'dayjs'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [
      'lib/iconfont.css'
    ],
    js: [
      'lib/vue.runtime.' + process.env.NODE_ENV + '.js',
      'lib/vuex.min.js',
      'lib/vue-router.min.js',
      'lib/axios.min.js',
      'lib/lodash.min.js',
      'lib/localforage.min.js',
      'lib/dayjs.min.js'
    ]
  },
  // 生产环境
  build: {
    css: [
      'lib/iconfont.css'
    ],
    js: [
      'lib/vue.runtime.' + process.env.NODE_ENV + '.js',
      'lib/vuex.min.js',
      'lib/vue-router.min.js',
      'lib/axios.min.js',
      'lib/lodash.min.js',
      'lib/localforage.min.js',
      'lib/dayjs.min.js'
    ]
  }
}

module.exports = {
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 9020, // 端口
    https: false,
    open: false, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy: {
      //配置跨域
      '/api': {
        target: "https://test.xxx.com",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: '@import "assets/css/mixin.scss";@import "assets/css/variables.scss";'
      },
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            // ant
            'primary-color': '#F66',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
            // vant
            hack: `true; @import "/src/plugin/vant.less";`
          },
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: config => {
    config.name = pkg.description
    config.externals = externals
  },

  chainWebpack: config => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      if (IS_PROD) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })

    /**
     * 设置保留空格
     */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    /**
     * 打包分析
     */
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static'
      }])
    }
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, config => config.devtool('cheap-source-map'))

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          // 将 runtime 作为内联引入不单独存在
          inline: /runtime\..*\.js$/
        }])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
