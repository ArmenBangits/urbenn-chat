import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import scrollToBottom from '../../helpers/scrollToBottom'
import { getMessages, selectAllMessages } from './../../ducks/chat'
import ChatMessage from './ChatMessage'

const ChatMessages = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectAllMessages)

  useEffect(() => {
    scrollToBottom()
    dispatch(getMessages())
  }, [])

  console.log(messages)

  return (
    <div className='chat-container-wrapper'>
      {messages.map((m, idx) => (
        <ChatMessage key={m.id || idx} message={m} />
      ))}
    </div>
  )
}

export default ChatMessages
