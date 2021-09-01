import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentChatId } from '../../ducks/chat'
import { selectChatSectionMessages } from './../../ducks/chat'

const ChatMessagesList = () => {
  const currentChatId = useSelector(selectCurrentChatId)
  const chatSectionMessages = useSelector(selectChatSectionMessages)

  if (!currentChatId) return null

  return (
    <React.Fragment>
      {chatSectionMessages.map((m) => (
        <div key={m.id}>{m.message}</div>
      ))}
    </React.Fragment>
  )
}

export default ChatMessagesList
