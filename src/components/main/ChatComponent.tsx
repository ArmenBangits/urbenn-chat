import React, { useEffect } from 'react'
import FadeIn from 'react-fade-in'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessages } from '.'
import {
  actionCreators as appStatesActionCreators,
  selectAppState
} from '../../ducks/appStates'
import { ErrorShowing } from '../shared'
import {
  subscribeForMessages,
  unSubscribeFromSocket
} from './../../ducks/chatSockets'
import { IChatProps } from './../../index'
import ChatInput from './ChatInput'

const ChatComponent: React.FC<IChatProps> = ({
  senderUserId,
  receiverUserId,
  translations,
  componentProps,
  chatTitle,
  chatTitleImage
}) => {
  const dispatch = useDispatch()
  const {
    senderUserId: reduxSenderUserId,
    receiverUserId: reduxReceiverUserId
  } = useSelector(selectAppState)

  useEffect(() => {
    if (!senderUserId || !receiverUserId)
      throw new Error(
        '@CHAT_SERVICE_ERROR: Sender user id and receiver user id is required'
      )

    if (!componentProps)
      throw new Error('@CHAT_SERVICE_ERROR: Component props is required')

    dispatch(subscribeForMessages())

    dispatch(
      appStatesActionCreators.setChatInformation(senderUserId, receiverUserId)
    )

    dispatch(appStatesActionCreators.setComponentProps(componentProps))

    if (translations)
      dispatch(appStatesActionCreators.setChatTranslations(translations))

    return () => {
      unSubscribeFromSocket()
    }
  }, [senderUserId, receiverUserId])

  if (!reduxSenderUserId || !reduxReceiverUserId) return null

  return (
    <div className='chat-app-wrapper card' id='chat-service'>
      <FadeIn>
        {chatTitle && (
          <div className='p-3 chat-app-wrapper__header'>
            <img src={chatTitleImage} alt={chatTitle} />
            <div>{chatTitle}</div>
          </div>
        )}
        <ErrorShowing name='chat-global-crash'>
          <ChatMessages />
          <ChatInput />
        </ErrorShowing>
      </FadeIn>
    </div>
  )
}

export default ChatComponent
