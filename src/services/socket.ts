// eslint-disable-next-line prettier/prettier
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr'

export interface ISocketService {
  connect: (baseUrl: string, hubName: string) => Promise<void>
  disconnect: () => Promise<void>
  invoke: (methodName: string, ...args: unknown[]) => Promise<void>
  on: <T>(methodName: string, fn: (event: T) => void) => void
  socket: HubConnection | null
}

class SocketService implements ISocketService {
  socket: HubConnection | null = null
  private methods: {
    methodName: string
    subscriber: (...args: unknown[]) => void
  }[] = []

  disconnect = async () => {
    await this.socket?.stop()
    this.methods.forEach((method) => this.socket?.off(method.methodName))
  }

  async invoke(methodName: string, ...args: unknown[]) {
    if (this.socket?.state === HubConnectionState.Connected)
      this.socket.invoke(methodName, ...args)
  }

  on<T>(methodName: string, fn: (event: T) => void) {
    if (this.socket?.state === HubConnectionState.Connected)
      this.socket.on(methodName, fn)
  }

  reconnect = async () => {
    if (
      this.socket &&
      (this.socket.state === HubConnectionState.Connecting ||
        this.socket.state === HubConnectionState.Connected ||
        this.socket.state === HubConnectionState.Reconnecting)
    )
      return

    await this.socket?.start()
    this.methods.forEach((method) =>
      this.socket?.on(method.methodName, method.subscriber)
    )
  }

  async connect(baseUrl: string, hubName: string) {
    if (this.socket && this.socket?.state !== HubConnectionState.Disconnected)
      return

    const socket: HubConnection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/${hubName}`)
      // .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    this.socket = socket

    await socket.start()

    this.socket.onclose = this.disconnect

    const originalOn = socket.on.bind(socket)

    this.socket.on = (
      methodName: string,
      subscriber: (...args: unknown[]) => void
    ) => {
      this.methods.push({
        methodName,
        subscriber
      })
      return originalOn(methodName, subscriber)
    }

    this.methods = []

    window.addEventListener('offline', this.disconnect)
    window.addEventListener('online', this.reconnect)
  }
}

const socketService = new SocketService()

export default socketService
