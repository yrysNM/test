import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales/index'

import './assets/base.css'
import './assets/main.css'
import './assets/style/google-font.css'

import dayjs from 'dayjs'

import AntDv, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

let app = createApp(App)

app.config.globalProperties.$dateFormat = 'DD/MM/YYYY'
app.config.globalProperties.$timeFormat = timeFormat
app.config.globalProperties.$getHourMinute = getHourMinute
app.config.globalProperties.$getFileName = getFileName
app.config.globalProperties.$toTimeStamp = toTimeStamp
app.config.globalProperties.$timeLocaleFormat = timeLocaleFormat
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$getTempStore = getTempStore
app.config.globalProperties.$setTempStore = setTempStore
// app.config.globalProperties.$publicPath = " "
app.config.globalProperties.$firstUpperCase = firstUpperCase
app.config.globalProperties.$onlyFirstUpperCase = onlyFirstUpperCase
app.config.globalProperties.$componentSize = 'small'
app.config.globalProperties.$onCopy = onCopy
app.config.globalProperties.$print = print

app.use(i18n).use(AntDv).mount('#app')

function timeFormat(t, hm) {
  if (!t) {
    return ''
  }
  if (typeof t != 'number') {
    if (typeof t == 'string') {
      t = new Date(t).getTime()
    } else {
      return t
    }
  }
  let d = new Date(t)
  let day = d.getDate()
  let m = d.getMonth() + 1
  let y = d.getFullYear()
  if (day.toString().length == 1) {
    day = '0' + day.toString()
  }
  if (m.toString().length == 1) {
    m = '0' + m.toString()
  }
  let h = d.getHours()
  let mn = d.getMinutes()
  if (h.toString().length < 2) {
    h = '0' + h
  }
  if (mn.toString().length < 2) {
    mn = '0' + mn
  }
  if (hm) {
    return `${day}/${m}/${y} ${h}:${mn}`
  }
  return `${day}.${m}.${y}`
}

const dateFormat = (n) => (n < 10 ? `0${n}` : `${n}`)

function getHourMinute(t) {
  if (typeof t !== 'number') return t

  let d = new Date(t)
  const h = dateFormat(d.getHours())
  const mn = dateFormat(d.getMinutes())

  return `${h}:${mn}`
}

function timeLocaleFormat(t) {
  if (!t) {
    return ''
  }
  if (typeof t != 'number') {
    return t
  }
  let d = new Date(t)
  let day = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Almaty',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(d)

  return day
}
function getFileName(url) {
  if (url && typeof url === 'string') {
    if (url.indexOf('/') == -1) {
      return url
    }
    return url.split('/')[url.split('/').length - 1]
  } else {
    return ''
  }
}

function toTimeStamp(time) {
  let e = time || 0
  if (e) {
    return dayjs(e).valueOf().toFixed(0) * 1
  } else {
    return e
  }
}

function getTempStore(key) {
  if (store.state.tempStore[key]) {
    return JSON.parse(JSON.stringify(store.state.tempStore[key]))
  } else {
    return {}
  }
}

function setTempStore(info) {
  if (typeof info == 'object') {
    store.commit('setTempStore', info)
    return true
  } else {
    console.log('info format error')
    return false
  }
}

function firstUpperCase(word) {
  if (!word || typeof word != 'string') {
    return ''
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function onlyFirstUpperCase(word) {
  if (!word || typeof word != 'string') {
    return ''
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

async function onCopy(text) {
  try {
    await navigator.clipboard.writeText(text)
    message.success(this.$t('l_Copied'))
  } catch (err) {
    message.error(this.$t('l_Failed_to_copy'))
  }
}

const resizeObserverErr = () => {}
window.addEventListener('error', resizeObserverErr)
