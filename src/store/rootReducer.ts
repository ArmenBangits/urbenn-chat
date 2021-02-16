// third party
import { combineReducers } from 'redux'
// reducers
import chatReducer from '../ducks/chat'

const rootReducer = combineReducers({
  chat: chatReducer
})

export default rootReducer
