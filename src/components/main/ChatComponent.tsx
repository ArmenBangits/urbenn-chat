import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessages } from '.'
import {
  actionCreators as appStatesActionCreators,
  selectAppState
} from '../../ducks/appStates'
import { ErrorShowing } from '../shared'
import { subscribeForMessages } from './../../ducks/chatSockets'
import { IChatProps } from './../../index'
import ChatInput from './ChatInput'

const ChatComponent: React.FC<IChatProps> = ({
  senderUserId,
  receiverUserId,
  translations
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

    dispatch(subscribeForMessages())

    dispatch(
      appStatesActionCreators.setChatInformation(senderUserId, receiverUserId)
    )

    if (translations)
      dispatch(appStatesActionCreators.setChatTranslations(translations))
  }, [senderUserId, receiverUserId])

  if (!reduxSenderUserId || !reduxReceiverUserId) return null

  return (
    <div className='chat-app-wrapper' id='chat-service'>
      <ErrorShowing name='chat-global-crash'>
        <ChatMessages />
        <ChatInput />
      </ErrorShowing>
    </div>
  )
}

export default ChatComponent
