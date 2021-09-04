import { HubConnectionState } from '@microsoft/signalr'
import { HUB_METHOD_NAMES } from '../constants/hub'
import {
  GetMessagesRequest,
  GetMessagesResponse,
  Message,
  SendMessageRequest
} from '../types'
import SocketService, { ISocketService } from './socket'

class MessageHub {
  private hubName = 'MessageHub'

  // eslint-disable-next-line no-useless-constructor
  constructor(private socketService: ISocketService) {}

  async start(baseUrl: string, onReconnecting: () => void) {
    try {
      if (
        this.socketService.socket &&
        this.socketService.socket?.state !== HubConnectionState.Disconnected
      )
        return

      await this.socketService.connect(baseUrl, this.hubName)

      if (this.socketService.socket)
        this.socketService.socket.onreconnecting = () => {
          this.socketService.disconnect()

          onReconnecting()
        }

      return Promise.resolve()
    } catch (error) {
      console.log(error)

      return Promise.reject(error)
    }
  }

  disconnect() {
    this.socketService.disconnect()
  }

  joinToChat(chatId: string) {
    return this.socketService.invoke(HUB_METHOD_NAMES.AddToChat, chatId)
  }

  getMessages(getMessagesRequest: GetMessagesRequest) {
    return new Promise<GetMessagesResponse>(async (resolve) => {
      await this.socketService.invoke(
        HUB_METHOD_NAMES.GetMessagesByChatId,
        getMessagesRequest
      )

      this.socketService.on<{ data: GetMessagesResponse }>(
        HUB_METHOD_NAMES.GetMessagesByChatId,
        (messages) => resolve(messages.data)
      )
    })
  }

  async sendMessage(sendMessagesRequest: SendMessageRequest) {
    await this.socketService.invoke(
      HUB_METHOD_NAMES.SendMessage,
      sendMessagesRequest
    )
  }

  subscribeForNewMessage(onNewMsg: (msg: Message) => void) {
    this.socketService.on(HUB_METHOD_NAMES.AddMessageSuccess, onNewMsg)
    this.socketService.on(HUB_METHOD_NAMES.NewMessage, onNewMsg)
  }

  async subscribeForChatUnReadMessagesCount({
    baseHubUrl,
    userId,
    onCountUpdate
  }: {
    baseHubUrl: string
    userId: number
    onCountUpdate: (count: number) => void
  }) {
    await this.start(baseHubUrl, () =>
      this.subscribeForChatUnReadMessagesCount({
        baseHubUrl,
        userId,
        onCountUpdate
      })
    )

    this.socketService.on(
      HUB_METHOD_NAMES.GetUserUnreadChatsCount,
      (updatedCountResponse: { data: number }) =>
        onCountUpdate(updatedCountResponse.data)
    )
    this.socketService.on('GetUserUnreadChatsCountValidation', console.log)
    this.socketService.invoke(HUB_METHOD_NAMES.GetUserUnreadChatsCount, userId)
  }
}

const messageHub = new MessageHub(new SocketService())

export const messageHubForReminder = new MessageHub(new SocketService())

export default messageHub
