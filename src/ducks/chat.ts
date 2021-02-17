// @ts-nocheck

import { produce } from 'immer'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { createSelector } from 'reselect'
import * as chatApi from '../api'
import { ChatState, IMessage, InferValueTypes } from '../types'
import { MODULE_NAME } from './../config/index'
import onApplicationError, {
  showErrorAlert
} from './../helpers/onApplicationError'
import scrollToBottom from './../helpers/scrollToBottom'
import { selectAppState } from './appStates'

//#region - Actions

export const Types = {
  SET_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_MESSAGES`,
  ADD_MESSAGE: `${MODULE_NAME}/CHAT_CONTAINER/ADD_MESSAGE`
} as const

export const actionCreators = {
  setChatMessages: (messages: IMessage[]) => ({
    type: Types.SET_MESSAGES,
    payload: messages
  }),
  addMessage: (message: IMessage) => ({
    type: Types.ADD_MESSAGE,
    payload: message
  })
}

export type ActionTypes = ReturnType<InferValueTypes<typeof actionCreators>>

//#endregion

//#region - Selectors

export const selectChatState = (state: ChatState): ChatReduxState => state.chat

export const selectAllMessages = createSelector(
  selectChatState,
  (appStates) => appStates.messages
)

//#endregion

//#region - Chat thunks

export const getMessages = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action<typeof Types.SET_MESSAGES>
> => async (dispatch, getState) => {
  try {
    const { senderUserId, receiverUserId } = selectAppState(getState())

    if (!senderUserId || !receiverUserId)
      throw new Error(
        '@CHAT_SERVICE_ERROR: Sender user id and receiver user id is required'
      )

    const messages: IMessage[] = await chatApi.getMessages({
      senderUserId,
      receiverUserId
    })

    dispatch(actionCreators.setChatMessages(messages))

    scrollToBottom()
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

export const sendMessage = (
  message: string
): ThunkAction<
  void,
  ChatState,
  unknown,
  Action<typeof Types.ADD_MESSAGE>
> => async (dispatch, getState) => {
  try {
    const { senderUserId, receiverUserId } = selectAppState(getState())

    if (!senderUserId || !receiverUserId) return

    await chatApi.sendMessage({
      message,
      senderUserId,
      receiverUserId
    })

    // dispatch(actionCreators.addMessage(sendedMessage))

    scrollToBottom()
  } catch (error) {
    console.log(error)
    showErrorAlert('Что-то пошло не так! Проверьте соединение с интернетом')
  }
}

export const addOnlineUser = (
  connectionId: string
): ThunkAction<void, ChatState> => async (dispatch, getState) => {
  try {
    const { senderUserId } = selectAppState(getState())

    if (!senderUserId) return

    await chatApi.addOnlineUser(connectionId, senderUserId)

    scrollToBottom()
  } catch (error) {
    console.log(error)
    onApplicationError(error, dispatch)
  }
}

//#endregion

//#region - Chat reducer

const INITIAL_STATE = {
  messages: [] as IMessage[]
}

type ChatReduxState = typeof INITIAL_STATE

export default function chatReducer(
  state: ChatReduxState = INITIAL_STATE,
  action: ActionTypes
) {
  return produce(state, (draft: ChatReduxState) => {
    switch (action.type) {
      case Types.SET_MESSAGES:
        draft.messages = action.payload
        break
      case Types.ADD_MESSAGE:
        draft.messages = [...draft.messages, action.payload]
        break
      default:
        break
    }
  })
}

//#endregion
