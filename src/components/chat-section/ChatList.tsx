import cx from 'classnames'
import React, { FC, useCallback, useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { useDispatch, useSelector } from 'react-redux'
import { selectChatSectionComponentProps } from '../../ducks/appStates'
import {
  getChats,
  selectChatSectionChats,
  selectCurrentChatId
} from '../../ducks/chat'
// eslint-disable-next-line prettier/prettier
import {
  connectToHub,
  joinToChatSection,
  subscribeForNewMessage
} from '../../ducks/chatSectionSockets'
import timeDifference from '../../helpers/timeDifference'
import { ChatTypeNames } from '../../types'
import ChatFiltersContainer from './ChatFiltersContainer'

const ChatList: FC<{ disableAllAnimations?: boolean }> = ({
  disableAllAnimations = false
}) => {
  const dispatch = useDispatch()

  const chats = useSelector(selectChatSectionChats)
  const { userId } = useSelector(selectChatSectionComponentProps)

  const selectedChatId = useSelector(selectCurrentChatId)

  const [page] = useState(1)

  const [isReady, setReady] = useState(false)

  const onChatClick = useCallback(
    (chatId: string) => () => {
      if (!isReady || selectedChatId === chatId) return

      dispatch(joinToChatSection(chatId))
    },
    [dispatch, isReady, selectedChatId]
  )

  useEffect(() => {
    ;((dispatch(connectToHub()) as unknown) as Promise<void>).then(() => {
      setReady(true)

      dispatch(subscribeForNewMessage())
    })

    dispatch(getChats(page, null))
  }, [])

  return (
    <React.Fragment>
      <ChatFiltersContainer currentPage={page} />

      <FlipMove disableAllAnimations={disableAllAnimations} duration={750}>
        {chats.length ? (
          chats.map((chat) => {
            const user =
              chat.userFirst.userId === userId
                ? chat.userSecond
                : chat.userFirst

            return (
              <div
                className={cx('list-item', {
                  'list-item--selected': selectedChatId === chat.id,
                  'list-item--unread': chat.hasUnreadMessage
                })}
                key={chat.id}
                onClick={onChatClick(chat.id)}
              >
                <div className='profile-image'>
                  <img
                    className='img-sm rounded-circle'
                    src={user.icon}
                    alt={user.name}
                  />
                </div>
                <p className='user-name'>
                  {user.ownerShipTypeName} {user.companyName}
                </p>

                <p className='chat-info'>
                  {ChatTypeNames[chat.chatTypeId]} № {chat.chatTypeDataId}
                </p>

                {chat.lastMessage && (
                  <p className='chat-text'>{chat.lastMessage}</p>
                )}

                {chat.lastMessageDate && (
                  <p className='chat-message-date'>
                    {timeDifference(new Date(chat.lastMessageDate))}
                  </p>
                )}
              </div>
            )
          })
        ) : (
          <p className='chat-empty-text'>Пока нет сообщений</p>
        )}
      </FlipMove>
    </React.Fragment>
  )
}

export default ChatList
