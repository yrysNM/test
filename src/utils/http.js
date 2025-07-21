import axios from 'axios'
import config from '@/config'
import { useCommonStore } from '@/lib/store'
import { notification } from 'ant-design-vue'

export async function http(
  url,
  data,
  { isHaveLoading, isServiceBaseUrl } = { isHaveLoading: true, isServiceBaseUrl: true },
  method = 'post',
) {
  const token = useCommonStore().getToken
  const serviceName = useCommonStore().serviceBaseUrl
  const http = axios.create({
    timeout: 10000 * 3,
    baseURL: config.nakedBaseURL,
  })

  http.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        lang: 'kk',
      }
      return config
    },
    async (error) => {
      return Promise.reject(error)
    },
  )

  http.interceptors.response.use(
    async (res) => {
      if (res.data) {
        if ('result_code' in res.data) {
          res.data = {
            status: res.data.result_code,
            message: res.data.result_msg,
            data: res.data.data,
          }
        }
      }

      if (res.data && res.data?.status < 0) {
        toastMessage(res.data?.message, null, res.data?.data?.details || res.data?.status)
      }

      return res.data
    },
    async (error) => {
      console.log('------- error ---------')
      console.log('err code : ' + error.response.status)
      if (!error || !error.response) {
        return false
      }

      if (error.response.status == 401) {
        window.postMessage(
          {
            type: 'token-expired',
            data: null,
          },
          '*',
        )
        /**
         * @TODO change http refresh token
         */
        // return http(error.config)
        return false
      }
      if (error.response?.data?.message) {
        toastMessage(error.response?.data?.message, 'error', error.response.data)
      } else {
        toastMessage('Something went wrong ' + error.response.status, 'error', error.response.data)
      }
      return Promise.reject(error)
    },
  )

  let requestUrl = ''
  if (typeof serviceName === 'string' && isServiceBaseUrl) {
    requestUrl += 'service/' + serviceName + '/' + url
  } else {
    requestUrl += `${url}`
  }

  return http({ url: requestUrl, data, method })
}

function toastMessage(message, type, data) {
  if (!message) return
  notification[type || 'warning']({
    message: message,
    description: typeof data == 'string' ? data : JSON.stringify(data),
  })
}
