<template>
  <div>
    <a-image
      class="h-full w-full object-contain"
      :class="className"
      :src="imgUrl"
      fallback="https://object.pscloud.io/front-s3/web/client/20241218144835_8252fa22-86da-4ca7-885b-d85433fb40d5.png"
    ></a-image>
  </div>
</template>

<script>
import baseUrl from '@/config'
import axios from 'axios'
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgUrl: '',
      isLoading: false,
    }
  },
  watch: {
    src(val) {
      if (val && this.isLoading == false) {
        this.loadUrl()
      }
    },
  },
  mounted() {
    if (this.src) {
      this.loadUrl()
    }
  },
  methods: {
    loadUrl() {
      if (!this.src || this.isLoading) {
        return '-'
      } else if (this.src.indexOf('http') == 0) {
        this.imgUrl = this.src
        return
      }
      this.isLoading = true
      axios({
        method: 'post',
        url: baseUrl.nakedBaseURL + 'file/admin-url?path=' + this.src,
        data: {
          path: this.src,
        },
      })
        .then((res) => {
          this.isLoading = false
          if (res.status === 0) {
            this.imgUrl = res.data
          }
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
