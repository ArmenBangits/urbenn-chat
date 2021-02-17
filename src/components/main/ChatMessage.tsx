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
        'incoming-chat': message.senderUserId !== senderUserId,
        'outgoing-chat': message.senderUserId === senderUserId
      })}
    >
      <div className='chat-message'>
        <p>{message.message}</p>
      </div>
      <div className='sender-details'>
        <img
          className='sender-avatar img-xs rounded-circle'
          src='https://via.placeholder.com/37x37'
          alt='profile'
        />
        <p className='seen-text'>
          {translations.dateMessage}
          {transformDate(message.creationDate, translations.momentLocalization)}
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
