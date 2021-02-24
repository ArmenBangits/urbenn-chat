//#region - Chat Sockets thunks

import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState
} from '@microsoft/signalr'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { SOUNDS } from '../config'
import { ChatState } from '../types'
import onApplicationError from './../helpers/onApplicationError'
import scrollToBottom from './../helpers/scrollToBottom'
import { IMessage } from './../types/main/index'
import {
  actionCreators as globalStateActionCreators,
  selectAppState,
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
    const { senderUserId, receiverUserId } = selectAppState(getState())

    console.log(senderUserId)
    dispatch(globalStateActionCreators.changeErrorContainer(null))

    chatHub = new HubConnectionBuilder()
      .withUrl(`${baseUrl || 'https://localhost:44320'}/MessageHub`)
      .build()

    // @ts-ignore
    await chatHub.start({
      withCredentials: true
    })

    chatHub.onclose = () => unSubscribeFromSocket()

    if (chatHub?.state !== HubConnectionState.Connected) return

    const connectionId: string = await chatHub.invoke('GetConnectionId')

    dispatch(addOnlineUser(connectionId))

    // @ts-ignore
    chatHub.on('ReceiveMessage', (message: IMessage | IMessage[]) => {
      console.log(message)
      if (Array.isArray(message))
        message.forEach((m) => {
          dispatch(chatActions.addMessage(m))
        })
      else {
        // SELLER - 15
        // TC - 20
        // BUYER - 25

        // BUYER --> SELLER
        // TC --> BUYER

        // message.senderUserId === BUYER
        // message.receiverUserId === SELLER

        // x --> y
        // y --> x

        if (
          (message.senderUserId === senderUserId &&
            message.receiverUserId === receiverUserId) ||
          (message.receiverUserId === senderUserId &&
            message.senderUserId === receiverUserId)
        ) {
          dispatch(chatActions.addMessage(message))
          if (message.senderUserId !== senderUserId) {
            const notificationSound = new Audio(SOUNDS.notification)
            notificationSound.play()
          }
        }
      }

      scrollToBottom()
    })
  } catch (error) {
    onApplicationError(error, dispatch)
  }
}

//#endregion
