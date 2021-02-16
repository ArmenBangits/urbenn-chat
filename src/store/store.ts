import { applyMiddleware, compose, createStore, Store } from 'redux'
// reducer
import middlewares from './middlewares'
import rootReducer from './rootReducer'

type ChatState = ReturnType<typeof rootReducer>

const store: Store<ChatState> = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
)

export default store
