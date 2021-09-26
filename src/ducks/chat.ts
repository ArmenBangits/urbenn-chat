// @ts-nocheck

import { produce } from 'immer'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { createSelector } from 'reselect'
import * as api from '../api'
import {
  ChatState,
  ChatUsersInfoResponse,
  GetChatsResponse,
  InferValueTypes,
  Message,
  ReduxChatUsersInfo
} from '../types'
import { CHATS_PAGE_SIZE, MODULE_NAME } from './../config/index'
import onApplicationError from './../helpers/onApplicationError'
import {
  selectAppState,
  selectChatSectionComponentProps,
  selectComponentProps
} from './appStates'
import { joinToChat } from './chatSockets'

// #region - Actions

export const Types = {
  SET_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_MESSAGES`,
  ADD_MESSAGE: `${MODULE_NAME}/CHAT_CONTAINER/ADD_MESSAGE`,
  ADD_CHAT_USERS_INFO: `${MODULE_NAME}/CHAT_CONTAINER/ADD_CHAT_USERS_INFO`,
  SET_PAGED_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_PAGED_MESSAGES`,
  ADD_CHAT_SECTION_CHATS: `${MODULE_NAME}/CHAT_CONTAINER/ADD_CHAT_SECTION_CHATS`,
  SET_CHAT_SECTION_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_CHAT_SECTION_MESSAGES`,
  SET_PAGED_CHAT_SECTION_MESSAGES: `${MODULE_NAME}/CHAT_CONTAINER/SET_PAGED_CHAT_SECTION_MESSAGES`,
  ADD_CHAT_SECTION_MESSAGE: `${MODULE_NAME}/CHAT_CONTAINER/ADD_CHAT_SECTION_MESSAGE`,
  CHAT_UPDATED: `${MODULE_NAME}/CHAT_CONTAINER/CHAT_UPDATED`,
  SET_FIRST_MESSAGES_LOADING: `${MODULE_NAME}/CHAT_CONTAINER/SET_FIRST_MESSAGES_LOADING`,
  UPDATE_CHAT_UNREAD_MESSAGE: `${MODULE_NAME}/CHAT_CONTAINER/UPDATE_CHAT_UNREAD_MESSAGE`,
  SET_CHATS_LOADING: `${MODULE_NAME}/CHAT_CONTAINER/SET_CHATS_LOADING`,
  SET_CHAT_ID: `${MODULE_NAME}/CHAT_CONTAINER/SET_CHAT_ID`
} as const

export const actionCreators = {
  updateChatUnreadMessage: (chatId: string, isUnread: boolean) => ({
    type: Types.UPDATE_CHAT_UNREAD_MESSAGE,
    payload: { chatId, isUnread }
  }),
  setChatMessages: (messages: Message[]) => ({
    type: Types.SET_MESSAGES,
    payload: messages
  }),
  setChatsLoading: (isLoading: boolean) => ({
    type: Types.SET_CHATS_LOADING,
    payload: isLoading
  }),
  setFirstMessagesLoading: (isLoading: boolean) => ({
    type: Types.SET_FIRST_MESSAGES_LOADING,
    payload: isLoading
  }),
  chatUpdated: (chat: ChatUsersInfoResponse) => ({
    type: Types.CHAT_UPDATED,
    payload: chat
  }),
  setChatSectionMessages: (messages: Message[]) => ({
    type: Types.SET_CHAT_SECTION_MESSAGES,
    payload: messages
  }),
  setChatSectionPagedMessages: (messages: Message[]) => ({
    type: Types.SET_PAGED_CHAT_SECTION_MESSAGES,
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
  addChatSectionMessage: (message: Message) => ({
    type: Types.ADD_CHAT_SECTION_MESSAGE,
    payload: message
  }),
  addChatUsersInfo: (usersInfo: ReduxChatUsersInfo | null) => ({
    type: Types.ADD_CHAT_USERS_INFO,
    payload: usersInfo
  }),
  addChatSectionChats: (chats: ChatUsersInfoResponse[]) => ({
    type: Types.ADD_CHAT_SECTION_CHATS,
    payload: chats
  }),
  setChatId: (chatId: string | null) => ({
    type: Types.SET_CHAT_ID,
    payload: chatId
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

export const selectChatSectionChats = createSelector(
  selectChatState,
  (appStates) => appStates.chatSectionChats
)

export const selectCurrentChatId = createSelector(
  selectChatState,
  (appStates) => appStates.chatId
)

export const selectCurrentChat = createSelector(selectChatState, (appStates) =>
  appStates.chatSectionChats.find((chat) => chat.id === appStates.chatId)
)

export const selectChatSectionMessages = createSelector(
  selectChatState,
  (appStates) => appStates.chatSectionMessages
)

export const selectChatSectionInfo = createSelector(
  selectChatState,
  (appStates) => appStates.sectionChatInfo
)

export const selectFirstMessagesLoading = createSelector(
  selectChatState,
  (appStates) => appStates.firstMessagesLoading
)

export const selectChatsLoading = createSelector(
  selectChatState,
  (appStates) => appStates.isChatsLoading
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

    const chatUsersInfo = await api.getChatUsersInfo(chatId)

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

export const getChats = (
  page = 1,
  chatType,
  searchValue: string = ''
): ThunkAction<Promise<GetChatsResponse>, ChatState, unknown, Action> => async (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = selectChatSectionComponentProps(getState())

      dispatch(actionCreators.setChatsLoading(true))

      const chats = await api.getChats({
        chatType,
        page,
        pageSize: CHATS_PAGE_SIZE,
        searchValue: searchValue || null
      })

      dispatch(actionCreators.addChatSectionChats(chats.results))

      setTimeout(() => {
        dispatch(actionCreators.setChatsLoading(false))
      }, 500)

      resolve(chats)
    } catch (error) {
      dispatch(actionCreators.setChatsLoading(false))

      reject(error)
      onApplicationError(error, dispatch)
    }
  })
}

// #endregion

// #region - Chat reducer

const INITIAL_STATE = {
  messages: [] as Message[],
  chatSectionMessages: [] as Message[],
  chatInfo: null as ReduxChatUsersInfo | null,
  sectionChatInfo: null as ReduxChatUsersInfo | null,
  chatSectionChats: [] as ChatUsersInfoResponse[],
  chatId: null as string | null,
  firstMessagesLoading: false,
  isChatsLoading: false
}

type ChatReduxState = typeof INITIAL_STATE

const onChatUpdated = (
  draft: ChatReduxState,
  action: ReturnType<typeof actionCreators['chatUpdated']>
) => {
  const chat = action.payload

  if (draft.chatId === chat.id) chat.hasUnreadMessage = false

  const isChatExist = draft.chatSectionChats.find(
    (c) => c.id === action.payload.id
  )

  if (!isChatExist) return

  draft.chatSectionChats = [
    action.payload,
    ...draft.chatSectionChats.filter((c) => c.id !== chat.id)
  ]
}

export default function chatReducer(
  state: ChatReduxState = INITIAL_STATE,
  action: ActionTypes
) {
  return produce(state, (draft: ChatReduxState) => {
    switch (action.type) {
      case Types.SET_CHATS_LOADING:
        draft.isChatsLoading = action.payload
        break
      case Types.SET_MESSAGES:
        draft.messages = action.payload
        break
      case Types.ADD_MESSAGE:
        draft.messages = [...draft.messages, action.payload]
        break
      case Types.ADD_CHAT_SECTION_MESSAGE:
        draft.chatSectionMessages = [
          ...draft.chatSectionMessages,
          action.payload
        ]
        break
      case Types.SET_PAGED_MESSAGES:
        draft.messages = [...action.payload, ...draft.messages]
        break
      case Types.ADD_CHAT_USERS_INFO:
        draft.chatInfo = action.payload
        break
      case Types.ADD_CHAT_SECTION_CHATS:
        draft.chatSectionChats = action.payload
        break
      case Types.SET_CHAT_ID:
        draft.chatId = action.payload
        draft.sectionChatInfo = draft.chatSectionChats.find(
          (chat) => chat.id === action.payload
        )
        draft.chatSectionChats = draft.chatSectionChats.map((c) =>
          c.id === action.payload ? { ...c, hasUnreadMessage: false } : c
        )
        break
      case Types.SET_FIRST_MESSAGES_LOADING:
        draft.firstMessagesLoading = action.payload
        break
      case Types.SET_CHAT_SECTION_MESSAGES:
        draft.chatSectionMessages = action.payload
        break
      case Types.SET_PAGED_CHAT_SECTION_MESSAGES:
        draft.chatSectionMessages = [
          ...action.payload,
          ...draft.chatSectionMessages
        ]
        break
      case Types.CHAT_UPDATED:
        onChatUpdated(draft, action)
        break
      case Types.UPDATE_CHAT_UNREAD_MESSAGE:
        draft.chatSectionChats = draft.chatSectionChats.map((c) =>
          c.id === action.payload.chatId
            ? { ...c, hasUnreadMessage: action.payload.isUnread }
            : c
        )
        break
    }
  })
}
