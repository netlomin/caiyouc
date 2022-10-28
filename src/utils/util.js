import Vue from 'vue'
import _ from 'lodash'

/** 阶乘 */
const factorial = (s, e) => (s > e ? 0 : s === e ? e : s * factorial(s + 1, e))
/** 组合 */
const comb = (n, m) => (m > n ? 0 : m === n ? 1 : factorial(1, n) / factorial(1, m) / factorial(1, n - m))
/** 判断是否为null(undefined, null) */
const nvll = (o) => typeof(o) == 'undefined' || o == null
/** 判断是否无值(undefined, null, 0, '', {}) */
const nil = (o) => typeof(o) == 'undefined' || o == null || o === 0 || (o.length !== undefined && o.length == 0)
/** 当为nvll时，取默认值 */
const ifnull = (o, d) => nvll(o) ? d : o
/** 当为nil时，取默认值 */
const ifnil = (o, d) => nil(o) ? d : o
/** 是否存在（!nvll） */
const exists = (o) => !nvll(o)
/** ac值 */
const ac = (a) => {
  let s = new Set()
  for (let i of a) {
    for (let j of a) {
      if (i >= j) continue
      s.add(j - i)
    }
  }
  return s.size - a.length + 1
}
/** i是否在a, b之间*/
const inrange = (i, a, b) => a >= b ? i >= b && i <= a : i >= a && i <= b
/** a数组在m,n之间的元素个数 */
const rangec = (a, m, n) => a.filter(i => inrange(i, m, n)).length
/** 奇数个数 */
const odds = (a) => a.filter(i => i % 2 === 1).length
/** 数组中并列数个数 */
const unions = (a) => {
  a = a.sort((i, j) => i - j)
  let tmp = null
  let count = 0
  for (let i of a) {
    count += (tmp != null && i == tmp + 1) ? 1 : 0
    tmp = i;
  }
  return count;
}
/** 数组求和 */
const sum = (a) => a.reduce((c, v) => c += v, 0)
/** 跨度 */
const span = (a) => Math.max.apply(null, a) - Math.min.apply(null, a)

export default {
  /** 阶乘 */
  factorial,
  /** 组合 */
  comb,
  /** 判断是否为null(undefined, null) */
  nvll,
  /** 判断是否无值(undefined, null, 0, '', {}) */
  nil,
  /** 当为nvll时，取默认值 */
  ifnull,
  /** 当为nil时，取默认值 */
  ifnil,
  /** 是否存在（!nvll） */
  exists,
  /** ac值 */
  ac,
  /** i是否在a, b之间*/
  inrange,
  /** a数组在m,n之间的元素个数 */
  rangec,
  /** 奇数个数 */
  odds,
  /** 数组中并列数个数 */
  unions,
  /** 数组求和 */
  sum,
  /** 跨度 */
  span
}
