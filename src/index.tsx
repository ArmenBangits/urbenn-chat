import React from 'react'
import {Provider} from 'react-redux'
import ChatComponent from './components/ChatComponent'
import store from './store'

const Chat = () => {
  return (
    <Provider store={store}>
      <ChatComponent />
    </Provider>
  )
}

export default Chat
