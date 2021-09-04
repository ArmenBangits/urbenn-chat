export interface Message {
  message?: string
  id: string
  userId: number
  creationDate: string
  files: URL[]
  isRead: boolean
}

export interface IChatTranslations {
  textAreaPlaceholder: string
  momentLocalization: string
  dateMessage: string
  emojis: {
    notfound: string
    search: string
    recent: string
    smileys: string
    people: string
    nature: string
    foods: string
    activity: string
    places: string
    objects: string
    symbols: string
    flags: string
    custom: string
  }
}

export interface IComponentProps {
  fileExtensionsPath?: string
  acceptFiles?: string
  baseUrl?: string
  baseHubUrl?: string
  userId: number | null
  sendingWithRequests?: Object
}

export enum ChatTypes {
  Request = 1,
  Order,
  RetailOrder,
  Admin,
  TcOrder,
  Tender,
  NoType
}

export const ChatTypeNames = {
  [ChatTypes.Request]: 'Запрос',
  [ChatTypes.Order]: 'Заказ',
  [ChatTypes.RetailOrder]: 'Розничный заказ',
  [ChatTypes.Admin]: 'Администрация',
  [ChatTypes.TcOrder]: 'Заказ',
  [ChatTypes.Tender]: 'Тендер'
}

export const ChatTypeNamesForNotification = {
  [ChatTypes.Request]: 'запросу',
  [ChatTypes.Order]: 'заказу',
  [ChatTypes.RetailOrder]: 'розничному заказу',
  // [ChatTypes.Admin]: 'Администрация',
  [ChatTypes.TcOrder]: 'заказу',
  [ChatTypes.Tender]: 'тендеру'
}

export enum UserCategories {
  Seller = 1,
  Buyer,
  TransportCompany,
  Admin
}

export interface User {
  userId: number
  name: string
  companyName: string
  icon: string
  userTypeId: number
  ownerTypeId: number
  ownerShipTypeName: string | null
}

export interface ChatUsersInfoResponse {
  id: string
  userFirst: User
  userSecond: User
  chatTypeId: ChatTypes
  chatUserTypeId: number
  chatTypeDataId: number
  creationDate: string
  lastMessage: string | null
  lastMessageDate: string | null
}

export interface Pagination {
  pageSize: number
  page: number
}

export interface PagedResults<T> {
  results: T[]
}

export interface GetChatsRequest extends Pagination {
  searchValue?: string
  chatType: ChatTypes
}

export type GetChatsResponse = PagedResults<ChatUsersInfoResponse>

export interface GetMessagesRequest {
  userId: number
  chatId: string
  pagination: Pagination
}

export interface SendMessageRequest {
  userId: number
  receiverUserId: number
  chatId: string
  message: string
  files: string[]
}

export interface WithPagination<T> {
  results: T[]
  currentPage: number
  pageCount: number
  pageSize: number
  rowCount: number
  firstRowOnPage: number
  lastRowOnPage: number
}

export interface GetMessagesResponse extends WithPagination<Message> {}

export interface ReduxChatUsersInfo extends ChatUsersInfoResponse {
  receiverPropertyKey: 'userFirst' | 'userSecond'
  senderPropertyKey: 'userFirst' | 'userSecond'
}
