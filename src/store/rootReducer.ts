// third party
import { combineReducers } from 'redux'
import appStatesReducer from '../ducks/appStates'
// reducers
import chatReducer from '../ducks/chat'

const rootReducer = combineReducers({
  chat: chatReducer,
  appStates: appStatesReducer
})

export default rootReducer
