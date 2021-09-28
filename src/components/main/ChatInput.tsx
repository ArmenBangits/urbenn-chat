import classNames from 'classnames'
import { Picker } from 'emoji-mart'
import React, { useCallback, useEffect, useState } from 'react'
import { AnimatedList } from 'react-animated-list'
import { useDispatch, useSelector } from 'react-redux'
import { FileUpload, useFileUpload } from 'use-file-upload'
import {
  DEFAULT_MIMETYPES,
  INPUT_CHAT_MAX_LENGTH,
  MAX_FILE_LENGTH,
  MAX_FILE_SIZE
} from '../../config'
import createOutsideClickListener from '../../helpers/createOutsideClickListener'
import { showErrorAlert } from '../../helpers/onApplicationError'
import {
  selectComponentProps,
  selectTranslations
} from './../../ducks/appStates'
import { sendMessage } from './../../ducks/chatSockets'
import FileShower from './../shared/FileShower'

type ChatInputProps = {
  onSubmit?: (
    message: string | null,
    files: FileUpload[],
    resetForm: () => void
  ) => void
  acceptFiles?: string
  fileExtensionsPath?: string
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  acceptFiles = DEFAULT_MIMETYPES,
  fileExtensionsPath
}) => {
  // @ts-ignore
  const [selectedFiles, selectFiles] = useFileUpload()
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])

  const [isShowedEmojiPicker, setShowedEmojiPicker] = useState(false)
  const [messageValue, setMessageValue] = useState('')
  const translations = useSelector(selectTranslations)
  const componentProps = useSelector(selectComponentProps)
  const dispatch = useDispatch()

  const onFileSelect = useCallback(() => {
    // @ts-ignore
    selectFiles(
      { multiple: true, accept: acceptFiles || componentProps?.acceptFiles },
      // @ts-ignore
      (files: FileUpload[]) => {
        console.log(files)
        if (files.length + uploadedFiles.length > MAX_FILE_LENGTH)
          return showErrorAlert(
            `Максимальное количество файлов ${MAX_FILE_LENGTH}`
          )

        const deletedMaxSizeFiles = files.filter((f) => {
          const isValidMaxFileLength = f.size < MAX_FILE_SIZE

          if (f.size && !isValidMaxFileLength) {
            showErrorAlert('Файл слишком большой')
          }

          if (!f.size) showErrorAlert('Невалидный файл')

          return f.size && isValidMaxFileLength
        })

        let validExtensionsFiles = deletedMaxSizeFiles

        if (acceptFiles) {
          const allowed = acceptFiles.split(',').map((x) => x.trim())

          validExtensionsFiles = validExtensionsFiles.filter((file) => {
            const isValid =
              file?.file?.type === undefined
                ? true
                : allowed.includes(file?.file?.type) ||
                  allowed.includes(file?.file?.type.split('/')[0] + '/*')

            if (!isValid) showErrorAlert('Невалидный формат файла')

            return isValid
          })
        }

        setUploadedFiles([...uploadedFiles, ...validExtensionsFiles])
      }
    )
  }, [uploadedFiles, componentProps, acceptFiles])

  const toggleShowedEmojiPicker = useCallback(
    () => setShowedEmojiPicker(!isShowedEmojiPicker),
    [isShowedEmojiPicker]
  )

  const resetForm = useCallback(() => {
    setUploadedFiles([])
    setMessageValue('')
    setShowedEmojiPicker(false)
  }, [])

  const sendMessageEvent = useCallback(() => {
    if (!messageValue.trim() && !+uploadedFiles.length) return

    if (onSubmit) {
      onSubmit(messageValue.trim(), uploadedFiles, resetForm)
      return
    }

    ;((dispatch(
      sendMessage(messageValue.trim(), uploadedFiles)
    ) as unknown) as Promise<void>).then(resetForm)
  }, [messageValue, uploadedFiles])

  const onFileDelete = useCallback(
    (fileIndex: number) => () => {
      const newFiles = uploadedFiles.filter((_, index) => fileIndex !== index)

      setUploadedFiles(newFiles)
    },
    [uploadedFiles]
  )

  useEffect(() => {
    const subscriber = createOutsideClickListener(
      '.chat-text-field.emoji-picker'
    )

    subscriber.subscribe(() => setShowedEmojiPicker(false))

    return () => {
      subscriber.unsubscribe()
    }
  }, [])

  return (
    <div>
      <div
        className={classNames('emoji-picker chat-text-field mt-auto', {
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
              maxLength={INPUT_CHAT_MAX_LENGTH}
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
                fileExtensionsPath={fileExtensionsPath}
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
