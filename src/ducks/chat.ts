// @ts-nocheck

import { produce } from 'immer'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { createSelector } from 'reselect'
import { getChatUsersInfo } from '../api'
import {
  ChatState,
  InferValueTypes,
  Message,
  ReduxChatUsersInfo
} from '../types'
import { MODULE_NAME } from './../config/index'
import onApplicationError from './../helpers/onApplicationError'
import { selectAppState, selectComponentProps } from './appStates'
import { joinToChat } from './chatSockets'

// #region - Actions

export const Types = {
  SET_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_MESSAGES`,
  ADD_MESSAGE: `${MODULE_NAME}/CHAT_CONTAINER/ADD_MESSAGE`,
  ADD_CHAT_USERS_INFO: `${MODULE_NAME}/CHAT_CONTAINER/ADD_CHAT_USERS_INFO`,
  SET_PAGED_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_PAGED_MESSAGES`
} as const

export const actionCreators = {
  setChatMessages: (messages: Message[]) => ({
    type: Types.SET_MESSAGES,
    payload: messages
  }),
  setPagedMessages: (messages: Message[]) => ({
    type: Types.SET_PAGED_MESSAGES,
    payload: messages
  }),
  addMessage: (message: Message) => ({
    type: Types.ADD_MESSAGE,
    payload: message
  }),
  addChatUsersInfo: (usersInfo: ReduxChatUsersInfo | null) => ({
    type: Types.ADD_CHAT_USERS_INFO,
    payload: usersInfo
  })
}

export type ActionTypes = ReturnType<InferValueTypes<typeof actionCreators>>

// #endregion

// #region - Selectors

export const selectChatState = (state: ChatState): ChatReduxState => state.chat

export const selectAllMessages = createSelector(
  selectChatState,
  (appStates) => appStates.messages
)

export const selectChatUsersInfo = createSelector(
  selectChatState,
  (appStates) => appStates.chatInfo
)

// #endregion

// #region - Chat thunks

export const initialize = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action
> => async (dispatch, getState) => {
  try {
    const { chatId } = selectAppState(getState())

    const { userId } = selectComponentProps(getState())

    if (!chatId) return

    const chatUsersInfo = await getChatUsersInfo(chatId)

    const receiverPropertyKey =
      chatUsersInfo.userFirst.userId === userId ? 'userSecond' : 'userFirst'
    const senderPropertyKey =
      chatUsersInfo.userFirst.userId !== userId ? 'userSecond' : 'userFirst'

    dispatch(joinToChat()).then(() => {
      dispatch(
        actionCreators.addChatUsersInfo({
          ...chatUsersInfo,
          receiverPropertyKey,
          senderPropertyKey
        })
      )
    })
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

// #endregion

// #region - Chat reducer

const INITIAL_STATE = {
  messages: [] as Message[],
  chatInfo: null as ReduxChatUsersInfo | null
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
      case Types.SET_PAGED_MESSAGES:
        draft.messages = [...action.payload, ...draft.messages]
        break
      case Types.ADD_CHAT_USERS_INFO:
        draft.chatInfo = action.payload
        break
      default:
        break
    }
  })
}

// #endregion
