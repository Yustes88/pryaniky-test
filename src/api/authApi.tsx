import axios from 'axios'

const API_URL = `${process.env.REACT_APP_HOST_URL}`

if (!API_URL) {
  throw new Error('REACT_APP_API_URL environment variable is not defined')
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // Ensure Content-Type is correct
    // Include other necessary headers like Authorization if needed
  },
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['x-auth'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
