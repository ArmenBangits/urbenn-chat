import { HubConnectionState } from '@microsoft/signalr'
import { HUB_METHOD_NAMES } from '../constants/hub'
import { ChatUsersInfoResponse } from '../types'
import SocketService, { ISocketService } from './socket'

class ChatHub {
  private hubName = 'ChatHub'

  // eslint-disable-next-line no-useless-constructor
  constructor(private socketService: ISocketService) {}

  async start(baseUrl: string, token = '', onReconnecting: () => void) {
    try {
      if (
        this.socketService.socket &&
        this.socketService.socket?.state !== HubConnectionState.Disconnected
      )
        return

      await this.socketService.connect(baseUrl, this.hubName, token)

      if (this.socketService.socket)
        this.socketService.socket.onreconnecting = () => {
          this.socketService.disconnect()

          onReconnecting()
        }

      await this.socketService.invoke(HUB_METHOD_NAMES.SubscribeToHub)

      return Promise.resolve()
    } catch (error) {
      console.log(error)

      return Promise.reject(error)
    }
  }

  disconnect() {
    this.socketService.disconnect()
  }

  async addMessageEvent(chatId: string, message: string) {
    await this.socketService.invoke(HUB_METHOD_NAMES.AddMessageEvent, {
      chatId,
      message
    })
  }

  async getChatByIdEvent(chatId: string) {
    await this.socketService.invoke(HUB_METHOD_NAMES.GetChatByIdEvent, chatId)
  }

  subscribeForChatUpdate(onChatUpdate: (chat: ChatUsersInfoResponse) => void) {
    this.socketService.on(
      HUB_METHOD_NAMES.OnChatUpdate,
      ({ data }: { data: ChatUsersInfoResponse }) => onChatUpdate(data)
    )
  }
}

const chatHub = new ChatHub(new SocketService())

export default chatHub
