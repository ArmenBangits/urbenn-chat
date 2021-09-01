import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CHAT_INITIAL_PROPS } from '../../config'
import { actionCreators } from '../../ducks/appStates'
import { ChatList, ChatMessagesList } from '../chat-section'
import ChatInputContainer from '../chat-section/ChatInputContainer'

export type ChatSectionProps = {
  baseHubUrl?: string
  userId: number
  acceptFiles?: string
  fileExtensionsPath: string
}

const ChatSection: React.FC<ChatSectionProps> = (componentProps) => {
  const dispatch = useDispatch()

  const [initializedProps, setInitializedProps] = useState(false)

  useEffect(() => {
    dispatch(actionCreators.setChatSectionComponentProps(componentProps))

    setInitializedProps(true)
  }, [])

  if (!initializedProps) return null

  return (
    <div>
      <button
        type='button'
        className='btn btn-secondary py-3 mb-4 text-center d-md-none'
      >
        <i className='ti-menu mr-0 icon-md' />
      </button>
      <div className='card chat-app-wrapper'>
        <div className='row mx-0'>
          <div className='col-xl-3 col-md-4 chat-list-wrapper px-0'>
            <div className='chat-list-item-wrapper'>
              <ChatList />

              {/* <div className='list-item'>
                <div className='profile-image'>
                  <div className='dot-indicator sm bg-primary' />
                  <img
                    className='img-sm rounded-circle'
                    src='https://via.placeholder.com/43x43'
                    alt='profile'
                  />
                </div>
                <p className='user-name'>Lillian Woods</p>
                <p className='chat-time'>1 day ago</p>
                <p className='chat-text'>
                  Hello jessica, i will b ein london tomorrow, hope we can meer
                  there
                </p>
              </div>
              <div className='list-item'>
                <div className='profile-image'>
                  <div className='dot-indicator sm bg-primary' />
                  <img
                    className='img-sm rounded-circle'
                    src='https://via.placeholder.com/43x43'
                    alt='profile'
                  />
                </div>
                <p className='user-name'>Christina Love</p>
                <p className='chat-time'>2 days ago</p>
                <p className='chat-text'>Can you prep the File?</p>
              </div>
              <div className='list-item'>
                <div className='profile-image'>
                  <div className='dot-indicator sm bg-warning' />
                  <img
                    className='img-sm rounded-circle'
                    src='https://via.placeholder.com/43x43'
                    alt='profile'
                  />
                </div>
                <p className='user-name'>Mabelle King</p>
                <p className='chat-time'>3 days ago</p>
                <p className='chat-text'>
                  A new feature has been updated your account.Check it out…
                </p>
              </div>
              <div className='list-item'>
                <div className='profile-image'>
                  <img
                    className='img-sm rounded-circle'
                    src='https://via.placeholder.com/43x43'
                    alt='profile'
                  />
                </div>
                <p className='user-name'>Brandon Norton</p>
                <p className='chat-time'>4 days ago</p>
                <p className='chat-text'>
                  Hello, this is an invitation from one of the most interesting
                  teams...{' '}
                </p>
              </div>
             */}
            </div>
          </div>
          <div className='col-xl-9 px-0 d-flex flex-column'>
            <div className='chat-container-wrapper'>
              <ChatMessagesList />

              {/* <div className='chat-bubble incoming-chat'>
                <div className='chat-message'>
                  <p>
                    Leo duis ut diam quam nulla porttitor massa id neque. Sed
                    enim ut sem viverra aliquet eget sit. Aenean et tortor at
                    risus viverra.
                  </p>
                  <p>
                    Mi in nulla posuere sollicitudin aliquam ultrices. Mauris a
                    diam maecenas sed enim. Facilisi nullam vehicula ipsum a
                    arcu cursus vitae congue mauris. In cursus turpis massa
                    tincidunt dui. Mattis vulputate enim nulla aliquet porttitor
                    lacus.
                  </p>
                </div>
                <div className='sender-details'>
                  <img
                    className='sender-avatar img-xs rounded-circle'
                    src='https://via.placeholder.com/37x37'
                    alt='profile'
                  />
                  <p className='seen-text'>Message seen : 20 min ago</p>
                </div>
              </div>
              <div className='chat-bubble outgoing-chat'>
                <div className='chat-message'>
                  <p className='font-weight-bold'>Frank Carter</p>
                  <p>
                    Leo duis ut diam quam nulla porttitor massa id neque. Sed
                    enim ut sem
                  </p>
                </div>
                <div className='sender-details'>
                  <img
                    className='sender-avatar img-xs rounded-circle'
                    src='https://via.placeholder.com/37x37'
                    alt='profile'
                  />
                  <p className='seen-text'>Message seen : 10 min ago</p>
                </div>
              </div>
              <div className='chat-bubble incoming-chat'>
                <div className='chat-message'>
                  <p className='font-weight-bold'>Frank Carter</p>
                  <p>
                    Mi in nulla posuere sollicitudin aliquam ultrices. Mauris a
                    diam maecenas sed enim. Facilisi nullam vehicula ipsum a
                    arcu cursus vitae congue mauris.
                  </p>
                </div>
                <div className='sender-details'>
                  <img
                    className='sender-avatar img-xs rounded-circle'
                    src='https://via.placeholder.com/37x37'
                    alt='profile'
                  />
                  <p className='seen-text'>Message seen : 8 min ago</p>
                </div>
              </div>
              <div className='chat-bubble outgoing-chat'>
                <div className='chat-message'>
                  <p className='font-weight-bold'>Frank Carter</p>
                  <p>
                    Leo duis ut diam quam nulla porttitor massa id neque. Sed
                    enim ut sem
                  </p>
                  <p className='font-weight-medium'>
                    <i className='ti-clip mr-2' />
                    workfile.pdf
                  </p>
                </div>
                <div className='sender-details'>
                  <img
                    className='sender-avatar img-xs rounded-circle'
                    src='https://via.placeholder.com/37x37'
                    alt='profile'
                  />
                  <p className='seen-text'>Message seen : 10 min ago</p>
                </div>
              </div> */}
            </div>
            <div className='chat-text-field mt-auto'>
              <ChatInputContainer />
            </div>
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
