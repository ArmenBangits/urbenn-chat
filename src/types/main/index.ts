export interface Message {
  message?: string
  id?: number
  receiverUserId: number
  senderUserId: number
  creationDate: string
  file?: URL
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
}

export interface ChatUsersInfoResponse {
  id: string
  userFirst: User
  userSecond: User
  chatTypeId: ChatTypes
  chatUserTypeId: number
}

export interface Pagination {
  pageSize: number
  page: number
}
export interface GetMessagesRequest {
  userId: number
  chatId: string
  pagination: Pagination
}

export interface WithPagination<T>{
  results: T[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
}

export interface GetMessagesResponse extends WithPagination<Message[]> {}