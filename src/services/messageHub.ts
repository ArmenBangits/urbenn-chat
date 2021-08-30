
import { HUB_METHOD_NAMES } from '../constants/hub';
import { GetMessagesRequest, GetMessagesResponse } from '../types';
import socketService, { ISocketService } from './socket';

class MessageHub {
    private hubName = 'MessageHub'

    constructor(private socketService: ISocketService) {}

    async start(baseUrl: string, onReconnecting: () => void) {
        try {
            await this.socketService.connect(baseUrl, this.hubName)

            if (this.socketService.socket) this.socketService.socket.onreconnecting = () => {
                this.socketService.disconnect()

                onReconnecting()
            }

            return Promise.resolve()
        } catch(error) {
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
            await this.socketService.invoke('GetMessagesByChatId', getMessagesRequest)

            this.socketService.on<{data: GetMessagesResponse}>('GetMessagesByChatId', (messages) => resolve(messages.data))
        })
    }
}

const messageHub = new MessageHub(socketService);

export default messageHub;