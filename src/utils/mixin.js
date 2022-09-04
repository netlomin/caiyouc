/**
 * This provides mixins used for common functions in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [mixin]
 */
import _ from 'lodash'
import dayjs from 'dayjs'
import {
  Toast
} from 'vant'

const mixin = {
  sumArr(arr) {
    return _.reduce(
      arr,
      (sum, n) => {
        return sum + n
      },
      0
    )
  },
  downLoadBlob(
    arg = {
      name: '下载文件',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      data: ''
    }
  ) {
    const blob = new Blob([arg.data], { type: arg.type })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${arg.name}`
    link.click()
    window.URL.revokeObjectURL(link.href)
  },
  downLoadExcel(fileName = '下载文件', data) {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${fileName}`
    link.click()
    window.URL.revokeObjectURL(link.href)
  },
  translateColor(value) {
    let res = 'has-text-danger'
    if (value) {
      res = 'has-text-success'
    }
    return res
  },
  translatePlanKey(value) {
    let res = 'has-text-danger'
    if (value) {
      res = 'has-text-success'
    }
    return res
  },
  translatePlanRemind(value) {
    let res = null
    if (value) {
      switch (value) {
        case 1:
          res = 'has-text-grey'
          break
        case 2:
          res = 'has-text-info'
          break
        case 3:
          res = 'has-text-warning'
          break
        case 5:
          res = 'c-purple'
          break
        case 6:
          res = 'has-text-success'
          break
        default:
          res = 'has-text-danger'
      }
    }
    return res
  },
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = error => {
        reject(error)
      }
    })
  },
  /**
   * 生日转换为星座
   * @param mon 月份
   * @param day 日份（1-31）
   * @return string 对应日期生日的星座字符串
   * */
  constellation(mon, day) {
    const s = '摩羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯'
    const d = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]
    const i = mon * 2 - (day < d[mon - 1] ? 2 : 0)
    return `${s.substring(i, i + 2)}座`
  },
  replaceAll(str, search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement)
  },
  goBack() {
    window.history.back()
  },
  LoadStyle(url) {
    try {
      document.createStyleSheet(url)
    } catch (e) {
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.type = 'text/css'
      cssLink.href = url
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(cssLink)
    }
  },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    const position = {}
    if (to && to.hash) {
      position.selector = to.hash
      if (
        to.matched.some(m => {
          return m.meta.scrollToTop
        })
      ) {
        position.x = 0
        position.y = 0
      }
      return position
    }
    return false
  },
  /**
   * Get the query params from the URL
   * @returns string
   * @example
   * let token = urlParam('rtp_token')
   */
  urlParam(key) {
    let name
    let value
    let str = window.location.href
    const index1 = window.location.href.indexOf('?')
    const index2 = window.location.href.indexOf('#')
    if (index2 > index1) {
      str = str.substring(0, index2)
    }
    let num = str.indexOf('?')
    str = str.substr(num + 1)
    const arr = str.split('&')
    let argValue
    for (let i = 0; i < arr.length; i += 1) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        if (name === key) {
          argValue = value
        }
      }
    }
    return argValue
  },
  isArray(target) {
    if (_.isArray(target)) {
      return target.length > 0
    }
    return false
  },
  /**
   * Let the page scroll to the top
   */
  goToTop() {
    let timer = null
    timer = setInterval(() => {
      const toTop = document.body.scrollTop || document.documentElement.scrollTop
      const speed = Math.ceil(toTop / 5)
      document.documentElement.scrollTop = toTop - speed
      document.body.scrollTop = toTop - speed
      if (toTop === 0) {
        clearInterval(timer)
      }
    }, 50)
  },
  goToLink(url) {
    this.$router.push(url)
  },
  /**
   * Get the systemInfo
   * @returns object
   * @example
   * const systemInfo = printSystemInfo()
   */
  printSystemInfo() {
    const info = {}
    const ua = navigator.userAgent
    let logMsg = ''

    const ipod = ua.match(/(ipod).*\s([\d_]+)/i)
    const ipad = ua.match(/(ipad).*\s([\d_]+)/i)
    const iphone = ua.match(/(iphone)\sos\s([\d_]+)/i)
    const android = ua.match(/(android)\s([\d.]+)/i)

    logMsg = 'Unknown'
    if (android) {
      logMsg = `Android ${android[2]}`
    } else if (iphone) {
      logMsg = `iPhone, iOS ${iphone[2].replace(/_/g, '.')}`
    } else if (ipad) {
      logMsg = `iPad, iOS ${ipad[2].replace(/_/g, '.')}`
    } else if (ipod) {
      logMsg = `iPod, iOS ${ipod[2].replace(/_/g, '.')}`
    }
    let templogMsg = logMsg
    const version = ua.match(/MicroMessenger\/([\d.]+)/i)
    // logMsg = 'Unknown'
    if (version && version[1]) {
      templogMsg += `, WeChat ${version[1] || 'Unknown'}`
      console.info('[system]', 'System:', templogMsg)
    } else {
      console.info('[system]', 'System:', templogMsg)
    }
    // logMsg = 'Unknown'
    if (window.location.protocol === 'https:') {
      logMsg = 'HTTPS'
    } else if (window.location.protocol === 'http:') {
      logMsg = 'HTTP'
    } else {
      logMsg = window.location.protocol.replace(':', '')
    }
    templogMsg = logMsg
    let network = ua.toLowerCase().match(/ nettype\/([^ ]+)/g)
    // logMsg = 'Unknown'
    if (network && network[0]) {
      network = network[0].split('/')
      templogMsg += `, ${network[1] || 'Unknown'}`
      info.Network = templogMsg
    } else {
      info.Protocol = templogMsg
    }
    info.UA = ua
    setTimeout(() => {
      const performance = window.performance || window.msPerformance || window.webkitPerformance

      if (performance && performance.timing) {
        const t = performance.timing
        if (t.navigationStart) {
          info.navigationStart = dayjs(t.navigationStart).format()
        }
        if (t.navigationStart && t.domainLookupStart) {
          info.navigation = `${t.domainLookupStart - t.navigationStart}ms`
        }
        if (t.domainLookupEnd && t.domainLookupStart) {
          info.dns = `${t.domainLookupEnd - t.domainLookupStart}ms`
        }
        if (t.connectEnd && t.connectStart) {
          if (t.connectEnd && t.secureConnectionStart) {
            info.ssl = `${t.connectEnd - t.connectStart}ms (${t.connectEnd - t.secureConnectionStart}ms)`
          } else {
            info.tcp = `${t.connectEnd - t.connectStart}ms`
          }
        }
        if (t.responseStart && t.requestStart) {
          info.request = `${t.responseStart - t.requestStart}ms`
        }
        if (t.responseEnd && t.responseStart) {
          info.response = `${t.responseEnd - t.responseStart}ms`
        }
        if (t.domComplete && t.domLoading) {
          if (t.domContentLoadedEventStart && t.domLoading) {
            info.domCompleteDomLoaded = `${t.domComplete - t.domLoading}ms (${
              t.domContentLoadedEventStart - t.domLoading
            }ms)`
          } else {
            info.domComplete = `${t.domComplete - t.domLoading}ms`
          }
        }
        if (t.loadEventEnd && t.loadEventStart) {
          info.loadEvent = `${t.loadEventEnd - t.loadEventStart}ms`
        }
        if (t.navigationStart && t.loadEventEnd) {
          info.totalDOM = `${t.loadEventEnd - t.navigationStart}ms (${t.domComplete - t.navigationStart}ms)`
        }
      }
    }, 0)
    return info
  },
  /**
   * Replace the numerical to the ancient Chinese number
   * @param {number} n - number need to replaced
   * @returns {string} like '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'
   * @example
   * let cny = numToCny(100)
   */
  numToCny(n) {
    const fraction = ['角', '分']
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]
    const head = n < 0 ? '欠' : ''
    n = Math.abs(n)
    let s = ''
    for (let i = 0; i < fraction.length; i += 1) {
      s += (digit[Math.floor(n * 10 * 10 * i) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (let i = 0; i < unit[0].length && n > 0; i += 1) {
      let p = ''
      for (let j = 0; j < unit[1].length && n > 0; j += 1) {
        p = digit[n % 10] + unit[1][j] + p
        n = Math.floor(n / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return (
      head +
      s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
    )
  },
  // 表格未审批显示红色
  fnTableRowClassName({ row }) {
    return row.flowStatus === 0 ? 'warning-row' : ''
  },
  copyText(text) {
    if (navigator.clipboard) {
      // clipboard api 复制
      navigator.clipboard.writeText(text)
    } else {
      let dom = document.createElement('div')
      copyDom.innerText = text
      dom.style = 'position:absolute;top:0px;right:-9999px'
      document.body.appendChild(dom);
      //创建选中范围
      var range = document.createRange();
      range.selectNode(dom);
      //移除剪切板中内容
      window.getSelection().removeAllRanges();
      //添加新的内容到剪切板
      window.getSelection().addRange(range);
      try {
        //复制
        document.execCommand('copy');
      } catch (err) {
        console.error('copyText:', err)
      }
      dom.parentNode.removeChild(dom);
    }
  },
  firstChar(s) {
    return s && s.length ? s.charAt(0) : ''
  },
  caught(error) {
    console.error(error)

    if (!error.code) {
      Toast.fail('程序出错')
      return true
    }
    if (!/^\d+$/.test(error.code) ||
      parseInt(error.code) < 200) {
      if (!error.msg) {
        return false
      }
      if (error.msg.length <= 4) {
        Toast.fail(error.msg)
      } else {
        Toast({ message: error.msg, position: 'top' })
      }

      return true
    }
    return false
  },
  fmtAmt(i) {
    return typeof(i) !== 'number' ? i : i.toLocaleString()
  },
  simNum(i) {
    if (typeof(i) != 'number') return '-.--'
    if (i < 1E4) return prettifyNum(i)
    if (i < 1E8) return _.floor(i / 1E4, 2) + '万'
    return _.floor(i / 1E8, 2) + '亿'
  },
  listTable(t) {
    let list = []
    t.datas.forEach((data, row) => {
      let obj = {}
      t.heads.forEach((head, col) => {
        obj[head.name] = data[col]
      })
      list.push(obj)
    })
    return list
  }
}
export default {
  methods: mixin
}
