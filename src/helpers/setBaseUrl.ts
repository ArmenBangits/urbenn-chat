import axios from '../api/axios'

const setBaseUrl = (baseUrl: string) => (axios.defaults.baseURL = baseUrl)

export const setToken = (token: string) =>
  (axios.defaults.headers = { authorization: `Bearer ${token}` })

export default setBaseUrl
