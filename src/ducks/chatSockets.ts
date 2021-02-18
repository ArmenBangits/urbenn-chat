//#region - Chat Sockets thunks

import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState
} from '@microsoft/signalr'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ChatState } from '../types'
import onApplicationError from './../helpers/onApplicationError'
import scrollToBottom from './../helpers/scrollToBottom'
import { IMessage } from './../types/main/index'
import { actionCreators as globalStateActionCreators } from './appStates'
import { actionCreators as chatActions, addOnlineUser } from './chat'

let notificationHub: HubConnection | null

export const unSubscribeFromSocket = () => {
  if (notificationHub?.state === HubConnectionState.Connected)
    notificationHub?.stop()
}

export const subscribeForMessages = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action
> => async (dispatch) => {
  try {
    dispatch(globalStateActionCreators.changeErrorContainer(null))

    notificationHub = new HubConnectionBuilder()
      .withUrl('https://localhost:44320/MessageHub')
      .build()

    // @ts-ignore
    await notificationHub.start({
      withCredentials: true,
      origin: 'http://localhost:3000'
    })

    notificationHub.onclose = () => unSubscribeFromSocket()

    const connectionId: string = await notificationHub.invoke('GetConnectionId')

    dispatch(addOnlineUser(connectionId))

    notificationHub.on('ReceiveMessage', (message: IMessage | IMessage[]) => {
      if (Array.isArray(message))
        message.forEach((m) => dispatch(chatActions.addMessage(m)))
      else dispatch(chatActions.addMessage(message))

      scrollToBottom()
    })
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

//#endregion
