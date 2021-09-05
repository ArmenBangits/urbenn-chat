import { CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFirstMessagesLoading } from '../../ducks/chat'
import timeDifference from '../../helpers/timeDifference'
import { ChatUsersInfoResponse, Message } from '../../types'
import { FileShower } from '../shared'
import { getMessages } from './../../ducks/chatSectionSockets'
import createScrollToTopListener from './../../helpers/createScrollToTopListener'

type ChatMessagesListProps = {
  chatSectionMessages: Message[]
  currentChat: ChatUsersInfoResponse
  userId: number
}

const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  chatSectionMessages,
  currentChat,
  userId
}) => {
  const dispatch = useDispatch()

  const chatContainerElement = useRef<HTMLDivElement | null>(null)

  const [isMessagesLoading, setMessagesLoading] = useState(false)

  const isFirstMessagesLoading = useSelector(selectFirstMessagesLoading)

  useEffect(() => {
    if (!chatContainerElement.current) return

    const elementScrollSubscriber = createScrollToTopListener(
      chatContainerElement.current
    )

    let page = 1
    let isAllMessagesLoaded = false
    let isLoading = false

    elementScrollSubscriber.subscribe(() => {
      if (isAllMessagesLoaded || isLoading) return setMessagesLoading(false)

      setMessagesLoading(true)
      isLoading = true
      ;((dispatch(getMessages(page + 1)) as unknown) as Promise<
        Message[]
      >).then((newMessages) => {
        if (!newMessages.length) isAllMessagesLoaded = true

        page = page + 1

        setTimeout(() => {
          isLoading = false
          setMessagesLoading(false)
        }, 500)
      })
    })

    return () => {
      elementScrollSubscriber.unsubscribe()
    }
  }, [])

  return (
    <div className='chat-container-wrapper' ref={chatContainerElement}>
      <div
        className={cx('mt-3 text-center', {
          'opacity-0': isFirstMessagesLoading ? false : !isMessagesLoading
        })}
      >
        <CircularProgress color='inherit' />
      </div>

      {chatSectionMessages.map((m) => {
        const user =
          currentChat.userFirst.userId === m.userId
            ? currentChat.userFirst
            : currentChat.userSecond

        return (
          <div
            className={cx('chat-bubble', {
              'incoming-chat': userId !== m.userId,
              'outgoing-chat': userId === m.userId
            })}
            key={m.id}
          >
            <div className='chat-message'>
              <p>{m.message}</p>

              <div className='d-flex flex-wrap' style={{ marginLeft: -10 }}>
                {m.files.map((file, idx) => (
                  <FileShower
                    key={idx}
                    file={{
                      // @ts-ignore
                      name: file,
                      source: file
                    }}
                  />
                ))}
              </div>
            </div>
            <div className='sender-details'>
              <img
                className='sender-avatar img-xs rounded-circle'
                src={user.icon}
                alt='profile'
              />
              <p className='seen-text'>
                {timeDifference(new Date(m.creationDate))}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessagesList
