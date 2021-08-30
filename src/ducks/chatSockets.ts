// #region - Chat Sockets thunks

import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState
} from '@microsoft/signalr'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ChatState } from '../types'
import { HUB_METHOD_NAMES } from './../constants/hub'
import onApplicationError from './../helpers/onApplicationError'
import {
  actionCreators as globalStateActionCreators,
  selectAppState,
  selectComponentProps
} from './appStates'

let chatHub: HubConnection | null

export const unSubscribeFromSocket = () => {
  if (chatHub?.state === HubConnectionState.Connected && chatHub) chatHub.stop()
}

export const joinToChat = (): ThunkAction<void, ChatState, unknown, Action> => (
  dispatch,
  getState
) =>
  new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const { baseHubUrl, accessToken } = selectComponentProps(getState())
        const { chatId } = selectAppState(getState())

        dispatch(globalStateActionCreators.changeErrorContainer(null))

        chatHub = new HubConnectionBuilder()
          .withUrl(`${baseHubUrl}/MessageHub`, {
            accessTokenFactory: () => accessToken
          })
          .withAutomaticReconnect()
          .build()

        // @ts-ignore
        await chatHub.start({
          withCredentials: true
        })

        chatHub.onclose = () => unSubscribeFromSocket()

        chatHub.onreconnected = () => {
          unSubscribeFromSocket()
          dispatch(joinToChat())
        }

        if (chatHub?.state !== HubConnectionState.Connected) return

        await chatHub.invoke(HUB_METHOD_NAMES.AddToChat, chatId)

        // chatHub.on('ReceiveMessage', (message: IMessage | IMessage[]) => {
        //   console.log(message)
        //   if (Array.isArray(message))
        //     message.forEach((m) => {
        //       dispatch(chatActions.addMessage(m))
        //     })
        //   else {
        //     if (
        //       (message.senderUserId === senderUserId &&
        //         message.receiverUserId === receiverUserId) ||
        //       (message.receiverUserId === senderUserId &&
        //         message.senderUserId === receiverUserId)
        //     ) {
        //       dispatch(chatActions.addMessage(message))
        //       if (message.senderUserId !== senderUserId) {
        //         const notificationSound = new Audio(SOUNDS.notification)
        //         notificationSound.play()
        //       }
        //     }
        //   }

        // })

        // scrollToBottom()
        resolve(chatId)
      } catch (error) {
        reject(error)
        onApplicationError(error, dispatch)
      }
    })()
  })

// #endregion
