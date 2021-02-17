import axios from 'axios'
import store from './store'

export * from './store'

axios.defaults.baseURL = '/api'

export default store
