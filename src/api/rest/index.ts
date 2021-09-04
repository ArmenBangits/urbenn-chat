import { FileUpload } from 'use-file-upload'
import { API_CALL_URLS } from '../../constants/api'
import axios from '../axios'
import {
  ChatUsersInfoResponse,
  GetChatsRequest,
  GetChatsResponse,
  ISuccessResponse,
  Message
} from './../../types'

export interface IGetMessagesBody {
  senderUserId: number
  receiverUserId: number
}
export const getMessages = async (
  body: IGetMessagesBody,
  sendedWithRequest: Object
) => {
  const { data: messages } = await axios.post<ISuccessResponse<Message[]>>(
    '/message/GetMessages',
    { ...body, ...sendedWithRequest }
  )

  return messages.data
}

export interface ISendMessageBody extends IGetMessagesBody {
  message: string
}
export const sendMessage = async (
  body: ISendMessageBody,
  sendedWithRequest: Object
) => {
  const { data: messages } = await axios.post<ISuccessResponse<Message>>(
    '/message/SendMessage',
    { ...body, ...sendedWithRequest }
  )

  return messages.data
}

export const uploadFile = async (
  uploadedFiles: FileUpload[],
  senderUserId: number,
  receiverUserId: number,
  sendedWithRequest: Object
) => {
  const formData = new FormData()

  uploadedFiles.forEach((fileData) => formData.append('Files', fileData.file))

  formData.append('SenderUserId', senderUserId.toString())
  formData.append('ReceiverUserId', receiverUserId.toString())

  Object.entries(sendedWithRequest).forEach(([key, value]) =>
    formData.append(key, value)
  )

  await axios.post('/message/UploadImage', formData)
}

export interface ISendMessageBody extends IGetMessagesBody {
  message: string
}
export const addOnlineUser = async (connectionId: string, userId: number) => {
  const { data: messages } = await axios.post<ISuccessResponse<Message[]>>(
    '/common/AddOnlineUser',
    {
      connectionId,
      userId
    }
  )

  return messages.data
}

export const getChatUsersInfo = async (chatId: string) => {
  const { data: chatUserInfoResponse } = await axios.get<
    ISuccessResponse<ChatUsersInfoResponse>
  >(API_CALL_URLS.getChatUsersInfo(chatId))

  return chatUserInfoResponse.data
}

export const getChats = async ({
  searchValue,
  chatType,
  page,
  pageSize
}: GetChatsRequest) => {
  const { data: getChatsResponse } = await axios.get<
    ISuccessResponse<GetChatsResponse>
  >(
    `${API_CALL_URLS.getChats}/?${
      Number(searchValue) ? `searchValue=${Number(searchValue)}&` : ''
    }${
      chatType ? `chatType=${chatType}&` : ''
    }&Pagination.Page=${page}&Pagination.PageSize=${pageSize}`
  )

  return getChatsResponse.data
}
