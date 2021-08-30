export interface IMessage {
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
  accessToken: string
  sendingWithRequests?: Object
}

export interface ChatUsersInfoResponse {}
