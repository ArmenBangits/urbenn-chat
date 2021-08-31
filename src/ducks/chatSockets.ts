// #region - Chat Sockets thunks

import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { FileUpload } from 'use-file-upload'
import { MESSAGES_PAGE_SIZE, SOUNDS } from '../config'
import { convertFilesToBase64 } from '../helpers/convertFileToBase64'
import scrollToBottom from '../helpers/scrollToBottom'
import { messageHub } from '../services'
import { ChatState, Message } from '../types'
import onApplicationError from './../helpers/onApplicationError'
import {
  actionCreators as globalStateActionCreators,
  selectAppState,
  selectComponentProps
} from './appStates'
import { actionCreators } from './chat'

export const joinToChat = (): ThunkAction<
  Promise<void>,
  ChatState,
  unknown,
  Action
> => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const { baseHubUrl } = selectComponentProps(getState())
        const { chatId } = selectAppState(getState())

        if (!chatId) return

        dispatch(globalStateActionCreators.changeErrorContainer(null))

        await messageHub.start(baseHubUrl || '', () => {
          dispatch(joinToChat())
        })

        await messageHub.joinToChat(chatId)

        resolve()
      } catch (error) {
        reject(error)
        onApplicationError(error, dispatch)
      }
    })()
  })

export const getMessages = (
  page = 1
): ThunkAction<Promise<Message[]>, ChatState, unknown, Action> => (
  dispatch,
  getState
) =>
  new Promise(async (resolve) => {
    try {
      const { chatId } = selectAppState(getState())

      const { userId } = selectComponentProps(getState())

      if (!chatId || !userId) return

      const messages = await messageHub.getMessages({
        chatId,
        pagination: {
          page,
          pageSize: MESSAGES_PAGE_SIZE
        },
        userId
      })

      if (page === 1) dispatch(actionCreators.setChatMessages(messages.results))
      else dispatch(actionCreators.setPagedMessages(messages.results))

      resolve(messages.results)
    } catch (error) {
      onApplicationError(error, dispatch)
    }
  })

export const sendMessage = (
  message: string,
  files: FileUpload[]
): ThunkAction<Promise<void>, ChatState, unknown, Action> => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const { chatId } = selectAppState(getState())

        const { userId } = selectComponentProps(getState())

        if (!chatId || !userId) return

        const sendMessageRequest = {
          message,
          files: await convertFilesToBase64(files),
          chatId,
          userId
        }

        await messageHub.sendMessage(sendMessageRequest)

        resolve()
      } catch (error) {
        reject(error)
        onApplicationError(error, dispatch)
      }
    })()
  })
}

export const subscribeForNewMessage = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action
> => (dispatch, getState) => {
  const { userId } = selectComponentProps(getState())

  messageHub.subscribeForNewMessage((message) => {
    dispatch(actionCreators.addMessage(message))
    if (userId === message.userId) scrollToBottom()
    else {
      const notificationSound = new Audio(SOUNDS.notification)
      notificationSound.play()
    }
  })
}

// #endregion
