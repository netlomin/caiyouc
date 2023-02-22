import Vue from 'vue'
import _ from 'lodash'

const _vm = Vue.prototype

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
const COLORS = [
  ['#800', '#F66'],
  ['#008', '#66F']
]
const COLOR_FC3D = [COLORS[0], COLORS[0], COLORS[0]]
const CP = {
  SSQ: { ico: 'ssq', col: 7, color: '#F88', colors: COLORS },
  KL8: { ico: 'ssq', col: 7, color: '#F66', colors: COLORS },
  QLC: { ico: 'ssq', col: 7, color: '#88F', colors: COLORS },
  FC3D: { ico: 'ssq', col: 5, color: '#F8F', colors: COLOR_FC3D }
}

const cpSetArea = (cp, code, index) => {
  let o = {}
  o.cp = cp, o.code = code, o.index = index
  o.codesList = []
  let arr = code.split(SIGN.caret)
  if (arr.length == 2) {
    o.codesList.push(arr[0].split(SIGN.comma))
    o.codesList.push(arr[1].split(SIGN.comma))
  } else {
    o.codesList.push([])
    o.codesList.push(arr[0].split(SIGN.comma))
  }
  o.draw = (area) => {
    _vm.$set(o, 'drawCodes', area.codesList[1])
  }
  o.hit = (code) => {
    return o.drawCodes && o.drawCodes.includes(code)
  }
  o.color = (j) => {
    return CP[o.cp].colors[o.index][j]
  }
  return o
}

const cpSet = (cp, code) => {
  let o = {}
  o.cp = cp, o.code = code
  let arr = code.split(SIGN.star)
  o.multiple = arr.length == 2 ? parseInt(arr[1]) : 1
  arr = arr[0].split(SIGN.at)
  o.play = arr.length == 2 ? parseInt(arr[1]) : 1
  arr = arr[0].split(SIGN.bar)
  o.areas = arr.map((c, i) => cpSetArea(cp, c, i))
  o.draw = (set) => {
    o.areas.forEach((v, i) => { v.draw(set.areas[i]) })
  }
  return o
}

const cpSets = (cp, code) => {
  return code ? code.split(SIGN.and).map(c => cpSet(cp, c)) : []
}

const enhance = (o) => {
  if (!o || o.enhance) return
  o.enhance = true
  Object.defineProperties(o, {
    sets: {
      get: function() {
        if (!this._sets) {
          _vm.$set(this, '_sets', cpSets(this.cp, this.code))
        }
        return this._sets
      }
    },
    set: {
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
    area.colors = conf.colors[area.no - 1]
    // 选号区标题
    arr = arr[0].split(SIGN.tilde)
    area.desc = arr.length == 2 ? arr[1] : '选号'
    // 选号数
    arr = arr[0].split(SIGN.exclamation)
    area.cnt = arr.length == 2 ? parseInt(arr[1]) : 1
    area.minCnt = area.cnt
    area.rndCnt = area.cnt
    // 是否支持胆拖
    area.gallEnabled = area.cnt >= 2
    // 号码
    area.codes = arr[0].split(SIGN.comma)
    area.maxCnt = area.codes.length
  })
}

const randPick = (play, opts) => {
  let areas = play.areas
  let arrays = []
  areas.forEach(area => {
    let codes = area.codes
    let picks = area.picks
    let galls = codes.filter((code, i) => picks[i] == 2)
    codes = codes.filter((code, i) => picks[i] != 2)
    codes = _.shuffle(codes).slice(0, area.rndCnt - galls.length).sort()
    arrays.push([galls, codes])
  })
  let codes = arrays.map(array => {
    let code = '';
    if (array[0].length) {
      code += array[0].join(',')
      code += '^'
    }
    code += array[1].join(',')
    return code
  })
  let pick = { cp: play.cp, code: codes.join('|') + '@' + play.play }
  enhance(pick)
  return pick
}

const showPick = (play, pick) => {
  let areas = play.areas
  pick.set.areas.forEach((p, i) => {
    let area = areas[i]
    let codes = area.codes
    let picks = area.picks
    _.fill(picks, 0)
    codes.forEach((c, j) => {
      if (p.codesList[0].includes(c)) {
        picks.splice(j, 1, 2)
        return
      }
      if (p.codesList[1].includes(c)) {
        picks.splice(j, 1, 1)
        return
      }
    })
  })
}

const cleanPick = (play) => {
  play.areas.forEach((area, i) => {
    let picks = area.picks
    _.fill(picks, 0)
    picks.splice(0, 1, 0)
  })
}

const getPick = (play) => {
  let areas = play.areas
  let arrays = []
  areas.forEach(area => {
    let codes = area.codes
    let picks = area.picks
    let galls = codes.filter((code, i) => picks[i] == 2)
    codes = codes.filter((code, i) => picks[i] == 1)
    arrays.push([galls, codes])
  })
  let codes = arrays.map(array => {
    let code = '';
    if (array[0].length) {
      code += array[0].join(',')
      code += '^'
    }
    code += array[1].join(',')
    return code
  })
  let pick = { cp: play.cp, code: codes.join('|') + '@' + play.play }
  enhance(pick)
  return pick
}

export default {
  enhance,
  resolvePlay,
  randPick,
  showPick,
  cleanPick,
  getPick
}
