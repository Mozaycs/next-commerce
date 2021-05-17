/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const defaults = {
  baseUrl: window.location.origin,
  headers: {
    'Content-Type': 'application/json',
  },
  error: {
    title: 'Something went wrong. Please check your internet connection',
    status: 503,
    data: {},
  },
}

const api = (method, url, variables) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${defaults.baseUrl}/api/${url}`,
      headers: defaults.headers,
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
    }).then(
      (response) => {
        resolve(response.data)
      },
      (error) => {
        if (error?.response?.data?.title) {
          reject(error.response.data)
        } else {
          reject(defaults.error)
        }
      }
    )
  })
}

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  delete: (...args) => api('delete', ...args),
}
