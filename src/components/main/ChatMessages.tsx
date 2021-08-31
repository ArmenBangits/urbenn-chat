import { CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createScrollToTopListener from '../../helpers/createScrollToTopListener'
import scrollToBottom from '../../helpers/scrollToBottom'
import { Message } from '../../types'
import { selectAllMessages } from './../../ducks/chat'
import { getMessages, subscribeForNewMessage } from './../../ducks/chatSockets'
import ChatMessage from './ChatMessage'

const ChatMessages = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectAllMessages)

  const [isMessagesLoading, setMessagesLoading] = useState(false)

  const chatContainerElement = useRef<HTMLDivElement | null>(null)

  const onNewMessages = useCallback(() => scrollToBottom(), [])

  useEffect(() => {
    ;((dispatch(getMessages()) as unknown) as Promise<Message[]>).then(
      onNewMessages
    )

    dispatch(subscribeForNewMessage())

    if (!chatContainerElement.current) return

    const elementScrollSubscriber = createScrollToTopListener(
      chatContainerElement.current
    )

    let page = 1
    let isAllMessagesLoaded = false
    let isLoading = false

    elementScrollSubscriber.subscribe(() => {
      if (isAllMessagesLoaded || isLoading) return

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

  console.log(messages)

  return (
    <div className='chat-container-wrapper' ref={chatContainerElement}>
      <div
        className={cx('text-center', {
          'opacity-0': !isMessagesLoading
        })}
      >
        <CircularProgress color='inherit' />
      </div>
      {messages.map((m, idx) => (
        <ChatMessage key={m.id || idx} message={m} />
      ))}
    </div>
  )
}

export default ChatMessages
