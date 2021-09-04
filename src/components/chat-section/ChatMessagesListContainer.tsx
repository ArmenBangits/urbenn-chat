import { CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectChatSectionChats,
  selectChatSectionMessages,
  selectCurrentChatId,
  selectFirstMessagesLoading
} from '../../ducks/chat'
import { ChatUsersInfoResponse } from '../../types'
import { selectChatSectionComponentProps } from './../../ducks/appStates'
import ChatMessagesList from './ChatMessagesList'

const ChatMessagesListContainer = () => {
  const currentChatId = useSelector(selectCurrentChatId)
  const chatSectionMessages = useSelector(selectChatSectionMessages)

  const chatSectionChats = useSelector(selectChatSectionChats)

  const isFirstMessagesLoading = useSelector(selectFirstMessagesLoading)

  const [currentChat, setCurrentChat] = useState<ChatUsersInfoResponse | null>(
    null
  )

  const { userId } = useSelector(selectChatSectionComponentProps)

  useEffect(() => {
    if (currentChatId !== currentChat?.id && chatSectionChats) {
      const currentChat = chatSectionChats.find(
        (chat) => chat.id === currentChatId
      )

      if (currentChat) setCurrentChat(currentChat)
    }
  }, [currentChatId])

  if (!currentChatId || !currentChat)
    return (
      <React.Fragment>
        <div
          className={cx('mt-3 text-center', {
            'opacity-0': !isFirstMessagesLoading
          })}
        >
          <CircularProgress color='inherit' />
        </div>
      </React.Fragment>
    )

  return (
    <React.Fragment>
      <ChatMessagesList
        chatSectionMessages={chatSectionMessages}
        currentChat={currentChat}
        userId={userId}
      />
    </React.Fragment>
  )
}

export default ChatMessagesListContainer
