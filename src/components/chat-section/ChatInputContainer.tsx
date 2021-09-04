import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FileUpload } from 'use-file-upload'
import { selectCurrentChatId } from '../../ducks/chat'
import { sendMessage } from '../../ducks/chatSectionSockets'
import ChatInput from '../main/ChatInput'
import { selectChatSectionComponentProps } from './../../ducks/appStates'

const ChatInputContainer = () => {
  const dispatch = useDispatch()

  const componentProps = useSelector(selectChatSectionComponentProps)
  const currentChatId = useSelector(selectCurrentChatId)

  const onSubmit = useCallback(
    (message: string | null, files: FileUpload[], resetForm) => {
      ;((dispatch(
        sendMessage(message || '', files)
      ) as unknown) as Promise<void>).then(resetForm)
    },
    []
  )

  if (!currentChatId) return null

  return (
    <React.Fragment>
      <div className='chat-text-field mt-auto'>
        <ChatInput
          fileExtensionsPath={componentProps.fileExtensionsPath}
          acceptFiles={componentProps.acceptFiles}
          onSubmit={onSubmit}
        />
      </div>
    </React.Fragment>
  )
}

export default ChatInputContainer
