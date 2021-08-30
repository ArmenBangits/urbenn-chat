import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { CHAT_SECTION_TOKEN } from '../constants'
import { showAlert } from '../helpers/alerts'
import onApplicationError from '../helpers/onApplicationError'
import scrollToBottom from '../helpers/scrollToBottom'
import {
  ChatResponseModel,
  ChatState,
  GetChatsRequest,
  MessageResponseModel,
  UserCategories
} from '../types'
import { chatSectionHub } from './../services'
import storageService from './../services/storageService'
import { GetMessagesResponse } from './../types/chat section/index'
import { selectAppState } from './appStates'

//#region   Actions and AC
const MODULE_NAME = 'CHAT_SECTION'

export const Types = {
  ADD_CHATS: `${MODULE_NAME}/ADD_CHATS`,
  ADD_CHATS_LOADING: `${MODULE_NAME}/ADD_CHATS_LOADING`,
  ADD_CHAT_SECTION_LOADING: `${MODULE_NAME}/ADD_CHAT_SECTION_LOADING`,
  SET_SELECTED_CHAT: `${MODULE_NAME}/SET_SELECTED_CHAT`,
  SET_CHAT_MESSAGES: `${MODULE_NAME}/SET_CHAT_MESSAGES`,
  SET_MESSAGES_LOADING: `${MODULE_NAME}/SET_MESSAGES_LOADING`,
  ADD_USER_CATEGORY: `${MODULE_NAME}/ADD_USER_CATEGORY`,
  SET_CHAT_PAGINATION: `${MODULE_NAME}/SET_CHAT_PAGINATION`,
  SET_NEW_CHAT_MESSAGES: `${MODULE_NAME}/SET_NEW_CHAT_MESSAGES`,
  SET_NEW_MESSAGES_LOADING: `${MODULE_NAME}/SET_NEW_MESSAGES_LOADING`,
  ADD_NEW_MESSAGE: `${MODULE_NAME}/ADD_NEW_MESSAGE`,
  RESET_MESSAGES: `${MODULE_NAME}/RESET_MESSAGES`
} as const

export const actionCreators = {
  resetMessages: () => ({
    type: Types.RESET_MESSAGES
  }),
  setNewMessagesLoading: (isLoading: boolean) => ({
    type: Types.SET_NEW_MESSAGES_LOADING,
    payload: isLoading
  }),
  setNewChatMessages: (
    chatMessages: MessageResponseModel[],
    fromStart: boolean,
    checkChats: boolean = false
  ) => ({
    type: Types.SET_NEW_CHAT_MESSAGES,
    payload: {
      messages: chatMessages,
      fromStart,
      checkChats
    }
  }),
  addChats: (chats: ChatResponseModel[]) => ({
    type: Types.ADD_CHATS,
    payload: chats
  }),
  addMessagesLoading: (isLoading: boolean) => ({
    type: Types.SET_MESSAGES_LOADING,
    payload: isLoading
  }),
  addChatsLoading: (isLoading: boolean) => ({
    type: Types.ADD_CHATS_LOADING,
    payload: isLoading
  }),
  addChatSectionLoading: (isLoading: boolean) => ({
    type: Types.ADD_CHAT_SECTION_LOADING,
    payload: isLoading
  }),
  setSelectedChat: (chatId: string | null) => ({
    type: Types.SET_SELECTED_CHAT,
    payload: chatId
  }),
  setChatMessages: (chatMessages: MessageResponseModel[]) => ({
    type: Types.SET_CHAT_MESSAGES,
    payload: chatMessages
  }),
  setChatPagination: (paginationInfo: GetMessagesResponse['data'] | null) => ({
    type: Types.SET_CHAT_PAGINATION,
    payload: paginationInfo
  }),
  addUserCategory: (userCategoryId: UserCategories) => ({
    type: Types.ADD_USER_CATEGORY,
    payload: userCategoryId
  }),
  addNewMessage: (newMessage: MessageResponseModel) => ({
    type: Types.ADD_NEW_MESSAGE,
    payload: newMessage
  })
}

//#endregion

//#region - Chat Sockets thunks

export const subscribeForNewMessage = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action
> => async (dispatch, getState) => {
  try {
    const selectedChat = selectSelectedChat(getState())

    await chatSectionHub.subscribeForNewMessage((newMsg) => {
      if (selectedChat === newMsg.groupName)
        scrollToBottom('.chat-app-wrapper .chat-container-wrapper')

      dispatch(actionCreators.setNewChatMessages([newMsg], false, true))

      showAlert({
        type: 'info',
        msg: 'У вас новое сообщение!',
        onClick: () => {
          if (selectedChat !== newMsg.groupName)
            dispatch(actionCreators.setSelectedChat(newMsg.groupName))
        }
      })
    })
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

export const connect = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action
> => async (dispatch, getState) => {
  try {
    const {
      componentProps: { baseUrl }
    } = selectAppState(getState())

    const token = storageService.get(CHAT_SECTION_TOKEN)

    await chatSectionHub.connect(token, baseUrl || 'http://localhost:3000')

    dispatch(subscribeForNewMessage())
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

export const filterChats = (
  getChatRequest: GetChatsRequest
): ThunkAction<void, ChatState, unknown, Action> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(actionCreators.addChatsLoading(true))

    const initialStateResponse = await chatSectionHub.getChats(getChatRequest)

    dispatch(actionCreators.addChats(initialStateResponse.chats))

    dispatch(
      actionCreators.addUserCategory(
        initialStateResponse.senderCategoryId || UserCategories.CUSTOMER
      )
    )

    dispatch(actionCreators.addChatsLoading(false))
    dispatch(actionCreators.addChatSectionLoading(false))
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}
