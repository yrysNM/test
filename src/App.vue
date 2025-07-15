<template>
  <div class="app-area text-base">
    <div class="fixed inset-0 z-[99999] flex" v-if="isLoading">
      <a-spin class="m-auto" size="large" />
    </div>
    <config-provider :locale="locale" :component-size="$componentSize" hash-priority="high">
      <super-search :queryId="queryId" />
    </config-provider>
  </div>
</template>
<script>
import { version } from '/public//public-config/config.json'
import enUS from 'ant-design-vue/es/locale/en_US'
import kkKZ from 'ant-design-vue/es/locale/kk_KZ'
import ru_RU from 'ant-design-vue/es/locale/ru_RU'
import SuperSearch from './components/SuperSearch-v2.vue'

import axios from 'axios'
import { Spin } from 'ant-design-vue'
import { ConfigProvider } from 'ant-design-vue'
import config from '@/config'
import { useToken } from './lib/store'
import { mapActions } from 'pinia'
import { http } from './utils/http'

const BaseUrl = config.baseURL

export default {
  components: {
    ASpin: Spin,
    ConfigProvider,
    SuperSearch,
  },
  data() {
    return {
      isLoading: false,
      isTestServer: false,
      version: 1,
      new_version: 1,
      hasNewVersion: false,
      webUrl: 'V',
      showRefreshWebBox: false,
    }
  },
  computed: {
    locale() {
      switch (this.$i18n.locale) {
        case 'en':
          return enUS
        case 'kk':
          return kkKZ
        case 'ru':
          return ru_RU
      }
      return enUS
    },
    queryId() {
      const queryString = window.location.search
      const params = new URLSearchParams(queryString)
      return params.has('searchId') ? params.get('searchId') : ''
    },
  },
  mounted() {
    this.version = version
    this.webUrl = 'V'
    this.setTokenAttribute()

    this.updateToken()
  },
  methods: {
    ...mapActions(useToken, ['setToken']),
    updateToken() {
      window.addEventListener('message', (e) => {
        const res = e.data
        if (res.type === 'refresh-token' && res.data) {
          this.setToken(res.data)
        }
      })
    },
    setTokenAttribute() {
      const _getROOTElement = document.getElementById('app')
      const _token = _getROOTElement.getAttribute('token')
      this.setToken(_token)
    },
    downloadFileByToken(token) {
      window.open(BaseUrl + 'public/download/token?token=' + token)
    },
    tracecodeFormatTester(code) {
      code = code.replaceAll('-', '')
      return /^[0-9a-zA-Z]*$/.test(code)
    },
    shelfNumberFormatTester(code) {
      return /^[0-9]*(JP)[0-9]*$/i.test(code)
    },
    onRefreshGlobalWeb() {
      this.showRefreshWebBox = false
      setTimeout(() => {
        window.location.reload(true)
      }, 200)
    },
    checkWebVersion() {
      let version_1 = null
      var linkTag = document.querySelector('script[src*="js/app."][src$=".js"]')
      if (!linkTag) return
      var src = linkTag.getAttribute('src')
      if (!src) return
      var versionMatch = src.match(/js\/app\.([a-z0-9]+)\.js/i)
      if (versionMatch) {
        version_1 = versionMatch[1]
      } else {
        return
      }
      let url = 'https://' + window.location.hostname + '/admin/index.html?v=' + Date.now()
      axios.get(url).then((res) => {
        if (typeof res.data != 'string') return
        let version_2 = null
        var versionRegex = /js\/app\.([a-z0-9]+)\.js/i
        var match = res.data.match(versionRegex)
        if (match) {
          version_2 = match[1]
        } else {
          return
        }
        if (version_1 == version_2) {
          console.log(
            '%c[' + version_2 + ']Керемет, сіз соңғы нұсқаны пайдаланып жатырсыз!',
            'color:green;',
          )
        } else {
          this.showRefreshWebBox = true
        }
      })
    },
    requestPOST(url, body, isHaveLoading = true) {
      this.isLoading = isHaveLoading
      return http(url, body).finally(() => (this.isLoading = false))
    },
  },
}
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}

#nprogress .bar {
  background-color: #1677ff !important;
  height: 5px !important;
}

a-modal {
  max-width: 300px;
}
</style>
