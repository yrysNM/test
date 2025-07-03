<template>
  <div class="app-area text-base">
    <div class="fixed inset-0 z-[99999] flex" v-if="false">
      <a-spin class="m-auto" size="large" />
    </div>
    <!-- <router-view /> -->
    <config-provider :locale="locale" :component-size="$componentSize" hash-priority="high">
      <!-- <router-view /> -->
      <super-search />
    </config-provider>

    <!--        <BlogNotifyModal ref="blogNotifyModal"/>-->
  </div>
</template>
<script>
import { version } from '/public//public-config/config.json'
import enUS from 'ant-design-vue/es/locale/en_US'
import kkKZ from 'ant-design-vue/es/locale/kk_KZ'
import ru_RU from 'ant-design-vue/es/locale/ru_RU'
import SuperSearch from './components/SuperSearch-v2.vue'

// import { mapGetters } from "vuex"

import axios from 'axios'
import { Spin } from 'ant-design-vue'
import { ConfigProvider } from 'ant-design-vue'
import config from '@/config'
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
  },
  mounted() {
    this.version = version
    this.webUrl = 'V'

    // setTimeout(()=>{
    //     // 打开一个新的浏览器窗口或标签页
    //     // window.open('applinks:kz.inexport.app', '_blank');
    //     // window.open('weixin://', '_blank');
    //     // window.open('weixin://')
    //
    // },2000)
  },
  methods: {
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
  },
}
</script>
<style>
#nprogress .bar {
  background-color: #1677ff !important;
  height: 5px !important;
}

a-modal {
  max-width: 300px;
}
</style>
