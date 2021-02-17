import axios from 'axios'
import { IMessage, ISuccessResponse } from './../../types'

export interface IGetMessagesBody {
  senderUserId: number
  receiverUserId: number
}
export const getMessages = async (body: IGetMessagesBody) => {
  const { data: messages } = await axios.post<ISuccessResponse<IMessage[]>>(
    '/api/message/GetMessages',
    body
  )

  return messages.data
}

export interface ISendMessageBody extends IGetMessagesBody {
  message: string
}
export const sendMessage = async (body: ISendMessageBody) => {
  const { data: messages } = await axios.post<ISuccessResponse<IMessage>>(
    '/api/message/SendMessage',
    body
  )

  return messages.data
}

export interface ISendMessageBody extends IGetMessagesBody {
  message: string
}
export const addOnlineUser = async (connectionId: string, userId: number) => {
  const { data: messages } = await axios.post<ISuccessResponse<IMessage[]>>(
    '/api/common/AddOnlineUser',
    {
      connectionId,
      userId
    }
  )

  return messages.data
}
