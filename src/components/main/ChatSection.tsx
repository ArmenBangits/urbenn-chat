import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { CHAT_INITIAL_PROPS, MESSAGE_NOTIFICATION_LIMIT } from '../../config'
import { actionCreators } from '../../ducks/appStates'
import { actionCreators as chatActionCreators } from '../../ducks/chat'
import { subscribeForChatUpdate } from '../../ducks/chatSectionSockets'
import { chatHub } from '../../services'
import { UserCategories, UserTypes } from '../../types'
import { ChatList } from '../chat-section'
import ChatInputContainer from '../chat-section/ChatInputContainer'
import ChatMessagesListContainer from '../chat-section/ChatMessagesListContainer'
import messageHub from './../../services/messageHub'

export type ChatSectionProps = {
  baseHubUrl?: string
  baseChatHubUrl?: string
  baseUrl?: string
  token?: string
  userId: number
  userCategoryId: UserCategories | null
  acceptFiles?: string
  fileExtensionsPath: string
  userTypeId?: UserTypes
}

const ChatSection: React.FC<ChatSectionProps> = (componentProps) => {
  const dispatch = useDispatch()

  const [initializedProps, setInitializedProps] = useState(false)
  const [disableAllAnimations, setDisableAllAnimations] = useState(true)

  useEffect(() => {
    dispatch(actionCreators.setChatSectionComponentProps(componentProps))

    setInitializedProps(true)

    setTimeout(() => {
      dispatch(
        subscribeForChatUpdate(() => {
          setDisableAllAnimations(false)

          setTimeout(() => {
            setDisableAllAnimations(true)
          }, 3000)
        })
      )
    }, 1000)

    return () => {
      dispatch(chatActionCreators.reset())
      chatHub.disconnect()
      messageHub.disconnect()
    }
  }, [])

  if (!initializedProps) return null

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={10000000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={MESSAGE_NOTIFICATION_LIMIT}
      />

      <button
        type='button'
        className='btn btn-secondary py-3 mb-4 text-center d-md-none'
      >
        <i className='ti-menu mr-0 icon-md' />
      </button>
      <div className='card chat-app-wrapper'>
        <div className='row mx-0'>
          <div className='col-md-4 chat-list-wrapper px-0'>
            <div className='chat-list-item-wrapper'>
              <ChatList disableAllAnimations={disableAllAnimations} />
            </div>
          </div>
          <div className='col-xl-8 px-0 d-flex flex-column chat-wrapper'>
            <ChatMessagesListContainer />

            <ChatInputContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

ChatSection.defaultProps = {
  acceptFiles: CHAT_INITIAL_PROPS.acceptFiles
}

export default ChatSection
