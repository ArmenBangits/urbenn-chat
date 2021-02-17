import { Picker } from 'emoji-mart'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTranslations } from './../../ducks/appStates'
import { sendMessage } from './../../ducks/chat'

const ChatInput: React.FC = () => {
  const [isShowedEmojiPicker, setShowedEmojiPicker] = useState(false)
  const [messageValue, setMessageValue] = useState('')
  const translations = useSelector(selectTranslations)
  const dispatch = useDispatch()

  const toggleShowedEmojiPicker = () =>
    setShowedEmojiPicker(!isShowedEmojiPicker)

  const sendMessageEvent = () => {
    if (!messageValue.trim()) return

    setMessageValue('')
    dispatch(sendMessage(messageValue))
  }

  return (
    <div className='chat-text-field mt-auto'>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <button
            type='button'
            className='input-group-text'
            onClick={toggleShowedEmojiPicker}
          >
            <i className='ti-face-smile icon-sm'></i>
          </button>
        </div>
        <form onSubmit={sendMessageEvent}>
          <textarea
            className='form-control chat-message-area'
            placeholder={translations.textAreaPlaceholder}
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessageEvent()
              }
            }}
          />
        </form>
        {isShowedEmojiPicker && (
          <Picker
            onSelect={(emoji) => {
              // @ts-ignore
              setMessageValue(messageValue + emoji.native)
            }}
            i18n={{
              notfound: translations.emojis.notfound,
              search: translations.emojis.search,
              categories: translations.emojis
            }}
          />
        )}
        <div className='input-group-append'>
          <button type='button' className='input-group-text'>
            <i className='ti-clip icon-sm'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
