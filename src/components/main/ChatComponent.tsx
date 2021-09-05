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
import { ChatTypeNames } from '../../types'
import { ErrorShowing } from '../shared'
import setBaseUrl from './../../helpers/setBaseUrl'
import { IChatProps } from './../../index'
import messageHub from './../../services/messageHub'
import ChatInput from './ChatInput'

const ChatComponent: React.FC<IChatProps> = ({
  chatId,
  translations,
  componentProps,
  baseUrl,
  sendingWithRequests,
  baseHubUrl,
  userId,
  baseChatHubUrl,
  token,
  onClose
}) => {
  const dispatch = useDispatch()
  const { chatId: reduxChatId } = useSelector(selectAppState)

  const chatUserInfo = useSelector(selectChatUsersInfo)

  useEffect(() => {
    if (!chatId || !userId)
      throw new Error('@CHAT_SERVICE_ERROR: Chat id and userId is required')

    if (baseUrl) setBaseUrl(baseUrl)

    dispatch(appStatesActionCreators.setChatInformation(chatId))

    dispatch(
      appStatesActionCreators.setComponentProps({
        ...CHAT_INITIAL_PROPS,
        ...componentProps,
        userId,
        token,
        baseHubUrl,
        baseUrl,
        sendingWithRequests: sendingWithRequests || {},
        baseChatHubUrl
      })
    )

    if (translations)
      dispatch(appStatesActionCreators.setChatTranslations(translations))

    dispatch(initialize())

    return () => {
      dispatch(chatActionCreators.addChatUsersInfo(null))
      dispatch(appStatesActionCreators.setChatInformation(null))
      dispatch(chatActionCreators.setChatMessages([]))
      dispatch(
        appStatesActionCreators.setComponentProps({
          ...CHAT_INITIAL_PROPS,
          ...componentProps,
          baseUrl,
          sendingWithRequests: {},
          userId: null
        })
      )
      messageHub.disconnect()
    }
  }, [translations, componentProps])

  const receiverUser =
    chatUserInfo && chatUserInfo[chatUserInfo.receiverPropertyKey]

  return (
    <div className='chat-app-wrapper card' id='chat-service'>
      <ErrorShowing name='chat-global-crash'>
        {reduxChatId && chatUserInfo && (
          <FadeIn>
            {receiverUser && (
              <div className='p-3 chat-app-wrapper__header'>
                <img src={receiverUser.icon} alt={receiverUser.name} />
                <div>
                  {receiverUser.ownerShipTypeName} {receiverUser.companyName}{' '}
                  {ChatTypeNames[chatUserInfo.chatTypeId]} №{' '}
                  {chatUserInfo.chatTypeDataId}
                </div>
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
        )}
      </ErrorShowing>
    </div>
  )
}

export default ChatComponent
