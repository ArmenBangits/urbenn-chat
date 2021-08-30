// #region - Chat Sockets thunks

import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { messageHub } from '../services'
import { ChatState } from '../types'
import onApplicationError from './../helpers/onApplicationError'
import {
  actionCreators as globalStateActionCreators,
  selectAppState,
  selectComponentProps
} from './appStates'
import { actionCreators } from './chat'

export const joinToChat = (): ThunkAction<Promise<void>, ChatState, unknown, Action> => (
  dispatch,
  getState
) =>
  new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const { baseHubUrl } = selectComponentProps(getState())
        const { chatId } = selectAppState(getState())

        if (!chatId) return

        dispatch(globalStateActionCreators.changeErrorContainer(null))

        await messageHub.start(baseHubUrl || '', () => {
          dispatch(joinToChat())
        });

        await messageHub.joinToChat(chatId)
        
        resolve()
      } catch (error) {
        reject(error)
        onApplicationError(error, dispatch)
      }
    })()
  });

export const getMessages = (): ThunkAction<void, ChatState, unknown, Action> => async (
  dispatch,
  getState
) => {
  try {
    const { chatId } = selectAppState(getState())
    
    const { userId } = selectComponentProps(getState())

    if (!chatId || !userId) return

    const messages = await messageHub.getMessages({
      chatId,
      pagination: {
        page: 1,
        pageSize: 10
      },
      userId
    })

    dispatch(actionCreators.setChatMessages(messages.results))
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

  

// #endregion
