import classNames from 'classnames'
import { Picker } from 'emoji-mart'
import React, { useCallback, useState } from 'react'
import { AnimatedList } from 'react-animated-list'
import { useSelector } from 'react-redux'
import { FileUpload, useFileUpload } from 'use-file-upload'
import { showErrorAlert } from '../../helpers/onApplicationError'
import {
  selectComponentProps,
  selectTranslations
} from './../../ducks/appStates'
// import { sendMessage } from './../../ducks/chat'
import FileShower from './../shared/FileShower'

const ChatInput: React.FC = () => {
  // @ts-ignore
  const [selectedFiles, selectFiles] = useFileUpload()
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])

  const [isShowedEmojiPicker, setShowedEmojiPicker] = useState(false)
  const [messageValue, setMessageValue] = useState('')
  const translations = useSelector(selectTranslations)
  const componentProps = useSelector(selectComponentProps)
  // const dispatch = useDispatch()

  console.log(componentProps.acceptFiles)

  const onFileSelect = useCallback(() => {
    // @ts-ignore
    selectFiles(
      { multiple: true, accept: componentProps.acceptFiles },
      // @ts-ignore
      (files: FileUpload[]) => {
        console.log(files)
        const deletedMaxSizeFiles = files.filter((f) => {
          const isValidFileLength = f.size < 10485760

          if (!isValidFileLength) {
            showErrorAlert('Файл слишком большой')
          }

          return isValidFileLength
        })
        console.log(selectedFiles)
        setUploadedFiles([...uploadedFiles, ...deletedMaxSizeFiles])
      }
    )
  }, [uploadedFiles, componentProps.acceptFiles])

  const toggleShowedEmojiPicker = useCallback(
    () => setShowedEmojiPicker(!isShowedEmojiPicker),
    [isShowedEmojiPicker]
  )

  const sendMessageEvent = useCallback(() => {
    if (!messageValue.trim() && !+uploadedFiles.length) return

    // dispatch(
    //   sendMessage(messageValue, uploadedFiles, () => {
    //     setUploadedFiles([])
    //     setMessageValue('')
    //     setShowedEmojiPicker(false)
    //   })
    // )
  }, [messageValue, uploadedFiles])

  const onFileDelete = useCallback(
    (fileIndex: number) => () => {
      const newFiles = uploadedFiles.filter((_, index) => fileIndex !== index)

      setUploadedFiles(newFiles)
    },
    [uploadedFiles]
  )

  return (
    <div>
      <div
        className={classNames('chat-text-field mt-auto', {
          'opened-emoji-tab': isShowedEmojiPicker
        })}
      >
        <div className='input-group'>
          <div className='input-group-prepend'>
            <button
              type='button'
              className='input-group-text emoji-btn'
              onClick={toggleShowedEmojiPicker}
            >
              <i className='ti-face-smile icon-sm' />
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
          <div className='input-group-append'>
            <button
              type='button'
              className='input-group-text'
              onClick={onFileSelect}
            >
              <i className='ti-clip icon-sm' />
            </button>
          </div>
          <div className='input-group-append'>
            <button
              type='button'
              className='input-group-text chat-text-field__send'
              onClick={sendMessageEvent}
            >
              <i className='ti-location-arrow icon-sm' />
            </button>
          </div>
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
        </div>
      </div>
      {uploadedFiles.length ? (
        <div className='mt-3'>
          <AnimatedList animation='grow'>
            {uploadedFiles.map((file, fileIndex) => (
              <FileShower
                key={file.name}
                file={file}
                showDelete
                onDelete={onFileDelete(fileIndex)}
              />
            ))}
          </AnimatedList>
        </div>
      ) : null}
    </div>
  )
}

export default ChatInput
