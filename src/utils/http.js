import axios from 'axios'
import config from '@/config'
import { useToken } from '@/lib/store'

export function http(url, data, method = 'post') {
  const token = useToken().getToken

  return axios({
    method,
    url: `${config.nakedBaseURL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        window.postMessage(
          {
            type: 'token-expired',
            data: null,
          },
          '*',
        )
      } else {
        console.error('Ошибка запроса', err)
      }

      return { status: -1, data: null }
    })
}
