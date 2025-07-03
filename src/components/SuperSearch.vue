<template>
  <div>
    <h3>Результат:</h3>
    <pre v-if="result">{{ result }}</pre>
    <p v-else>Нет данных</p>

    <button @click="$emit('refresh-token')">🔄 Refresh Token</button>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'

export default {
  name: 'SuperSearch',
  props: {
    query: String,
    token: String,
    type: {
      type: String,
      default: 'MAIL_NO',
    },
  },
  data() {
    return {
      result: null,
    }
  },
  watch: {
    query: {
      immediate: true,
      handler(val) {
        if (val) this.fetchData(val)
      },
    },
  },
  methods: {
    async fetchData(query) {
      if (!query.trim()) return

      try {
        const res = await axios.post(
          config.nakedBaseURL + 'order_service/protected/order/super-search',
          {
            key: query,
            type: this.type,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        )

        if (res.data?.status === 0) {
          this.result = res.data
          this.$emit('result', res.data)
        } else {
          console.warn('Ошибка:', res.data?.message)
        }
      } catch (err) {
        if (err.response?.status === 401) {
          this.$emit('token-expired')
        } else {
          console.error('Ошибка запроса', err)
        }
      }
    },
  },
}
</script>
