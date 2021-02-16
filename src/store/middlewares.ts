import logger from 'redux-logger'
import thunk from 'redux-thunk'
// reducer

let middlewares: any[] = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, logger]
}

export default middlewares
