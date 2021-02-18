import axios from '../api/axios'

const setBaseUrl = (baseUrl: string) => (axios.defaults.baseURL = baseUrl)

export default setBaseUrl
