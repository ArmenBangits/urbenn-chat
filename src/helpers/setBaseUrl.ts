import axios from 'axios'

const setBaseUrl = (baseUrl: string) => (axios.defaults.baseURL = baseUrl)

export default setBaseUrl
