import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAppState } from '../../ducks/appStates'
import { selectTranslations } from './../../ducks/appStates'
import transformDate from './../../helpers/transformDate'
import { IMessage } from './../../types/main/index'

interface ChatMessageProps {
  message: IMessage
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { senderUserId } = useSelector(selectAppState)
  const translations = useSelector(selectTranslations)

  return (
    <div
      className={classNames('chat-bubble', {
        'incoming-chat': message.senderUserId === senderUserId,
        'outgoing-chat': message.senderUserId !== senderUserId
      })}
    >
      <div className='d-flex align-items-center mb-2 chat-user-information'>
        <img
          className='sender-avatar img-xs rounded-circle mr-2'
          src='https://via.placeholder.com/37x37'
          alt='profile'
        />
        <small className='seen-text font-weight-bold w-100'>
          Контактное лицо: Armen Mesropyan
        </small>
      </div>

      <div className='chat-message'>
        <p>{message.message}</p>
      </div>
      <div className='sender-details mt-1'>
        <small
          className={classNames('seen-text font-weight-bold w-100', {
            'text-right': message.senderUserId === senderUserId,
            'text-left': message.senderUserId !== senderUserId
          })}
        >
          {translations.dateMessage}
          {transformDate(message.creationDate)}
        </small>
      </div>
    </div>
  )
}

export default ChatMessage
