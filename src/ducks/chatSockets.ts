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
import {
  actionCreators as globalStateActionCreators,
  selectComponentProps
} from './appStates'
import { actionCreators as chatActions, addOnlineUser } from './chat'

let chatHub: HubConnection | null

export const unSubscribeFromSocket = () => {
  if (chatHub?.state === HubConnectionState.Connected) chatHub?.stop()
}

export const subscribeForMessages = (): ThunkAction<
  void,
  ChatState,
  unknown,
  Action
> => async (dispatch, getState) => {
  try {
    const { baseUrl } = selectComponentProps(getState())

    dispatch(globalStateActionCreators.changeErrorContainer(null))

    chatHub = new HubConnectionBuilder()
      .withUrl(`${baseUrl || 'https://localhost:44320'}/MessageHub`)
      .build()

    // @ts-ignore
    await chatHub.start({
      withCredentials: true
    })

    chatHub.onclose = () => unSubscribeFromSocket()

    const connectionId: string = await chatHub.invoke('GetConnectionId')

    dispatch(addOnlineUser(connectionId))

    chatHub.on('ReceiveMessage', (message: IMessage | IMessage[]) => {
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
