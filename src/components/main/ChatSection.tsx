import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { CHAT_INITIAL_PROPS, MESSAGE_NOTIFICATION_LIMIT } from '../../config'
import { actionCreators } from '../../ducks/appStates'
import { subscribeForChatUpdate } from '../../ducks/chatSectionSockets'
import { chatHub } from '../../services'
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
  userCategoryId: number | null
  acceptFiles?: string
  fileExtensionsPath: string
}

const ChatSection: React.FC<ChatSectionProps> = (componentProps) => {
  const dispatch = useDispatch()

  const [initializedProps, setInitializedProps] = useState(false)

  useEffect(() => {
    dispatch(actionCreators.setChatSectionComponentProps(componentProps))

    setInitializedProps(true)

    setTimeout(() => {
      dispatch(subscribeForChatUpdate())
    }, 1000)

    return () => {
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
              <ChatList />
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
