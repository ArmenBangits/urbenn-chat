import { FileUpload } from 'use-file-upload'
import axios from '../axios'
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

export const uploadFile = async (
  uploadedFiles: FileUpload[],
  senderUserId: number,
  receiverUserId: number
) => {
  const formData = new FormData()

  uploadedFiles.forEach((fileData) => formData.append('Files', fileData.file))

  formData.append('SenderUserId', senderUserId.toString())
  formData.append('ReceiverUserId', receiverUserId.toString())

  await axios.post('/api/message/UploadImage', formData)
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
