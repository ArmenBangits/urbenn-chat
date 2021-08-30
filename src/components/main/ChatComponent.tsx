import React, { useEffect } from 'react'
import FadeIn from 'react-fade-in'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessages } from '.'
import { CHAT_INITIAL_PROPS } from '../../config'
import {
  actionCreators as appStatesActionCreators,
  selectAppState
} from '../../ducks/appStates'
import {
  actionCreators as chatActionCreators,
  initialize,
  selectChatUsersInfo
} from '../../ducks/chat'
import { ErrorShowing } from '../shared'
import { unSubscribeFromSocket } from './../../ducks/chatSockets'
import setBaseUrl from './../../helpers/setBaseUrl'
import { IChatProps } from './../../index'
import ChatInput from './ChatInput'

const ChatComponent: React.FC<IChatProps> = ({
  chatId,
  translations,
  componentProps,
  baseUrl,
  sendingWithRequests,
  baseHubUrl,
  accessToken
  // baseUrl,
  // onClose
}) => {
  const dispatch = useDispatch()
  const { chatId: reduxChatId } = useSelector(selectAppState)

  const chatUserInfo = useSelector(selectChatUsersInfo)

  useEffect(() => {
    if (!chatId) throw new Error('@CHAT_SERVICE_ERROR: Chat id is required')

    if (baseUrl) setBaseUrl(baseUrl)

    dispatch(appStatesActionCreators.setChatInformation(chatId))

    dispatch(
      appStatesActionCreators.setComponentProps({
        ...CHAT_INITIAL_PROPS,
        ...componentProps,
        accessToken,
        baseHubUrl,
        baseUrl,
        sendingWithRequests: sendingWithRequests || {}
      })
    )

    if (translations)
      dispatch(appStatesActionCreators.setChatTranslations(translations))

    dispatch(initialize())

    return () => {
      dispatch(appStatesActionCreators.setChatInformation(null))
      dispatch(chatActionCreators.setChatMessages([]))
      dispatch(
        appStatesActionCreators.setComponentProps({
          ...CHAT_INITIAL_PROPS,
          ...componentProps,
          baseUrl,
          sendingWithRequests: {}
        })
      )
      unSubscribeFromSocket()
    }
  }, [translations, componentProps])

  return (
    <div className='chat-app-wrapper card' id='chat-service'>
      <ErrorShowing name='chat-global-crash'>
        {reduxChatId && chatUserInfo && (
          <FadeIn>
            {/* {chatTitle && (
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
          )} */}
            <ChatMessages />
            <ChatInput />
          </FadeIn>
        )}
      </ErrorShowing>
    </div>
  )
}

export default ChatComponent
