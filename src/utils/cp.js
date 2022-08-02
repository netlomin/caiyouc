import Vue from 'vue'
import _ from 'lodash'

const SIGN = {
  hash: '#',
  and: '&',
  star: '*',
  at: '@',
  bar: '|',
  caret: '^',
  comma: ',',
  tilde: '~',
  plus: '+',
  dash: '-',
  exclamation: '!',
  dot: '.',
  colon: ':',
  dollar: '$',
  semicolon: ';',
  equal: '=',
  percent: '%'
}

const AREA = [
  ['#880000', '#FF8888'],
  ['#000088', '#8888FF']
]

const AREA_FC3D = [AREA[0], AREA[0], AREA[0]]

const CP = {
  SSQ: { ico: 'ssq', col: 7, color: '#FF8888', area: AREA },
  KL8: { ico: 'ssq', col: 7, color: '#FF6666', area: AREA },
  QLC: { ico: 'ssq', col: 7, color: '#8888FF', area: AREA },
  FC3D: { ico: 'ssq', col: 5, color: '#FF88FF', area: AREA_FC3D }
}

class CpSetArea {

  constructor(cp, code, index) {
    this.cp = cp, this.code = code, this.index = index
    this.codesList = []
    let arr = code.split(SIGN.caret)
    if (arr.length == 2) {
      this.codesList.push(arr[0].split(SIGN.comma))
      this.codesList.push(arr[1].split(SIGN.comma))
    } else {
      this.codesList.push([])
      this.codesList.push(arr[0].split(SIGN.comma))
    }
  }

  draw(area) {
    this.drawCodes = area.codesList[1]
  }

  hit(code) {
    return this.drawCodes && this.drawCodes.includes(code)
  }

  color(j) {
    return CP[this.cp].area[this.index][j]
  }
}

class CpSet {

  constructor(cp, code) {
    this.cp = cp, this.code = code
    let arr = code.split(SIGN.star)
    this.multiple = arr.length == 2 ? parseInt(arr[1]) : 1
    arr = arr[0].split(SIGN.at)
    this.play = arr.length == 2 ? parseInt(arr[1]) : 1
    arr = arr[0].split(SIGN.bar)
    this.areas = arr.map((c, i) => new CpSetArea(cp, c, i))
  }

  draw(set) {
    this.areas.forEach((v, i) => { v.draw(set.areas[i]) })
  }
}

const enhance = (o) => {
  if (!o || o.enhance) return
  o.enhance = true

  Object.defineProperties(o, {
    "sets": {
      get: function() {
        return this._sets || (this._sets = (this.code ? this.code.split(SIGN.and).map(c => new CpSet(o.cp,
          c)) : []))
      }
    },
    "set": {
      get: function() {
        let sets = this.sets
        return sets && sets.length ? sets[0] : null
      }
    }
  })

  o.draw = (draw) => {
    if (draw && draw.code) {
      enhance(draw)
      o.sets.forEach(set => set.draw(draw.set))
    }
  }
}

const resolvePlay = (play) => {
  play.areas = []
  let conf = CP[play.cp]
  play.code && play.code.split(SIGN.bar).forEach(code => {
    let area = {}
    play.areas.push(area)
    // 选号区显示列
    area.col = conf.col
    // 选号区编号
    let arr = code.split(SIGN.hash)
    area.no = arr.length == 2 ? parseInt(arr[1]) : 1
    let o = conf.area
    area.colors = o[area.no - 1]
    // 选号区标题
    arr = arr[0].split(SIGN.tilde)
    area.desc = arr.length == 2 ? arr[1] : '选号'
    // 选号数
    arr = arr[0].split(SIGN.exclamation)
    area.cnt = arr.length == 2 ? parseInt(arr[1]) : 1
    area.minCnt = area.cnt
    // 是否支持胆拖
    area.gallEnabled = area.cnt >= 2
    // 号码
    area.codes = arr[0].split(SIGN.comma)
    area.maxCnt = area.codes.length
  })
}

export default {
  enhance,
  resolvePlay
}
