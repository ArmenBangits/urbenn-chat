import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { FileUpload } from 'use-file-upload'
import { sendMessageEvent } from '../api'
import { MESSAGES_PAGE_SIZE, SOUNDS } from '../config'
import { convertFilesToBase64 } from '../helpers/convertFileToBase64'
import scrollToBottom from '../helpers/scrollToBottom'
import { messageHub } from '../services'
import { ChatState, Message } from '../types'
import onApplicationError from './../helpers/onApplicationError'
import { selectChatSectionComponentProps } from './appStates'
import {
  actionCreators,
  selectChatSectionInfo,
  selectCurrentChatId
} from './chat'

export const connectToHub = (): ThunkAction<
  Promise<void>,
  ChatState,
  unknown,
  Action
> => (dispatch, getState) =>
  new Promise(async (resolve) => {
    const { baseHubUrl } = selectChatSectionComponentProps(getState())

    await messageHub.start(baseHubUrl || '', () => {
      dispatch(connectToHub())
    })

    resolve()
  })

export const joinToChatSection = (
  chatId: string
): ThunkAction<void, ChatState, unknown, Action> => async (dispatch) => {
  await messageHub.joinToChat(chatId)

  dispatch(actionCreators.setChatId(chatId))

  dispatch(getMessages(1))
}

export const getMessages = (
  page = 1
): ThunkAction<Promise<Message[]>, ChatState, unknown, Action> => (
  dispatch,
  getState
) =>
  new Promise(async (resolve) => {
    try {
      const chatId = selectCurrentChatId(getState())

      const { userId } = selectChatSectionComponentProps(getState())

      if (!chatId || !userId) return

      const messages = await messageHub.getMessages({
        chatId,
        pagination: {
          page,
          pageSize: MESSAGES_PAGE_SIZE
        },
        userId
      })

      if (page === 1)
        dispatch(actionCreators.setChatSectionMessages(messages.results))
      else
        dispatch(actionCreators.setChatSectionPagedMessages(messages.results))

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
        const chatId = selectCurrentChatId(getState())

        const { userId } = selectChatSectionComponentProps(getState())

        const chatInfo = selectChatSectionInfo(getState())

        if (!chatId || !userId || !chatInfo) return

        const receiverPropertyKey =
          chatInfo.userFirst.userId === userId ? 'userSecond' : 'userFirst'

        const sendMessageRequest = {
          message,
          files: await convertFilesToBase64(files),
          chatId,
          userId,
          receiverUserId: chatInfo[receiverPropertyKey].userId
        }

        await messageHub.sendMessage(sendMessageRequest)

        resolve()

        sendMessageEvent(chatId)
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
  const { userId } = selectChatSectionComponentProps(getState())

  messageHub.subscribeForNewMessage((message) => {
    dispatch(actionCreators.addChatSectionMessage(message))
    if (userId === message.userId) scrollToBottom('')
    else {
      const notificationSound = new Audio(SOUNDS.notification)
      notificationSound.play()
    }
  })
}
