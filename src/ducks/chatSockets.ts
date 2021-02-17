//#region - Chat Sockets thunks

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ChatState } from '../types'
import onApplicationError from './../helpers/onApplicationError'
import scrollToBottom from './../helpers/scrollToBottom'
import { IMessage } from './../types/main/index'
import { actionCreators as chatActions, addOnlineUser, Types } from './chat'

let notificationHub: HubConnection | null

export const subscribeForMessages = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action<typeof Types.SET_MESSAGES | typeof Types.ADD_MESSAGE>
> => async (dispatch) => {
  try {
    notificationHub = new HubConnectionBuilder()
      .withUrl('https://localhost:44320/MessageHub')
      .build()

    // @ts-ignore
    await notificationHub.start({
      withCredentials: true,
      origin: 'http://localhost:3000'
    })

    const connectionId: string = await notificationHub.invoke('GetConnectionId')

    dispatch(addOnlineUser(connectionId))

    notificationHub.on('ReceiveMessage', (message: IMessage) => {
      console.log(message)
      dispatch(chatActions.addMessage(message))
      scrollToBottom()
    })
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

//#endregion
