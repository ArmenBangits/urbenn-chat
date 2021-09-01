import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats, selectChatSectionChats } from '../../ducks/chat'
import {
  connectToHub,
  joinToChatSection,
  subscribeForNewMessage
} from '../../ducks/chatSectionSockets'
import { ChatTypes } from '../../types'
import ChatFilters from './ChatFilters'

const ChatList = () => {
  const dispatch = useDispatch()

  const chats = useSelector(selectChatSectionChats)

  const [page] = useState(1)
  const [chatType] = useState(ChatTypes.Request)

  const [isReady, setReady] = useState(false)

  const onChatClick = useCallback(
    (chatId: string) => () => {
      if (!isReady) return

      dispatch(joinToChatSection(chatId))
    },
    [dispatch, isReady]
  )

  useEffect(() => {
    ;((dispatch(connectToHub()) as unknown) as Promise<void>).then(() => {
      setReady(true)

      dispatch(subscribeForNewMessage())
    })

    dispatch(getChats(page, chatType))
  }, [])

  return (
    <React.Fragment>
      {chats.map((chat) => (
        <div key={chat.id} onClick={onChatClick(chat.id)}>
          {chat.id}
        </div>
      ))}
      <ChatFilters />
      <div className='list-item'>
        <div className='profile-image'>
          <div className='dot-indicator sm bg-success' />
          <img
            className='img-sm rounded-circle'
            src='https://via.placeholder.com/43x43'
            alt='profile'
          />
        </div>
        <p className='user-name'>Peter Moore</p>
        <p className='chat-time'>30min ago</p>
        <p className='chat-text'>
          Hello everyone, Iam happy to share with you our new company goals..
        </p>
      </div>
    </React.Fragment>
  )
}

export default ChatList
