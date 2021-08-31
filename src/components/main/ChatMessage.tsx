import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectComponentProps } from '../../ducks/appStates'
import { FileShower } from '../shared'
import { selectTranslations } from './../../ducks/appStates'
import transformDate from './../../helpers/transformDate'
import { Message } from './../../types/main/index'

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { userId } = useSelector(selectComponentProps)
  const translations = useSelector(selectTranslations)

  return (
    <div
      className={classNames('chat-bubble', {
        'incoming-chat': message.userId === userId,
        'outgoing-chat': message.userId !== userId
      })}
    >
      <div className='chat-message'>
        <p>
          {message.message}

          <div className='d-flex flex-wrap' style={{ marginLeft: -10 }}>
            {message.files.map((file, idx) => (
              <FileShower
                key={idx}
                file={{
                  // @ts-ignore
                  name: file,
                  source: file
                }}
              />
            ))}
          </div>
        </p>
      </div>
      <div className='sender-details mt-1'>
        <small
          className={classNames('seen-text font-weight-bold w-100', {
            'text-right': message.userId === userId,
            'text-left': message.userId !== userId
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
