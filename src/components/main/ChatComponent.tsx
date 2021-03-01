import React, { useEffect } from 'react'
import FadeIn from 'react-fade-in'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessages } from '.'
import {
  actionCreators as appStatesActionCreators,
  selectAppState
} from '../../ducks/appStates'
import { ErrorShowing } from '../shared'
import { CHAT_INITIAL_PROPS } from './../../config/index'
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
  chatTitleImage,
  sendingWithRequests,
  baseUrl,
  onClose
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

    dispatch(
      appStatesActionCreators.setChatInformation(senderUserId, receiverUserId)
    )

    dispatch(
      appStatesActionCreators.setComponentProps({
        ...CHAT_INITIAL_PROPS,
        ...componentProps,
        baseUrl,
        sendingWithRequests: sendingWithRequests || {}
      })
    )

    if (translations)
      dispatch(appStatesActionCreators.setChatTranslations(translations))

    dispatch(subscribeForMessages())

    return () => {
      dispatch(appStatesActionCreators.setChatInformation(null, null))
      unSubscribeFromSocket()
    }
  }, [senderUserId, receiverUserId, translations, componentProps])

  if (!reduxSenderUserId || !reduxReceiverUserId) return null

  return (
    <div className='chat-app-wrapper card' id='chat-service'>
      <ErrorShowing name='chat-global-crash'>
        <FadeIn>
          {chatTitle && (
            <div className='p-3 chat-app-wrapper__header'>
              <img src={chatTitleImage} alt={chatTitle} />
              <div>{chatTitle}</div>
              <button
                type='button'
                className='chat-app-wrapper__close'
                onClick={onClose}
              >
                <i className='ti-close' />
              </button>
            </div>
          )}
          <ChatMessages />
          <ChatInput />
        </FadeIn>
      </ErrorShowing>
    </div>
  )
}

export default ChatComponent
