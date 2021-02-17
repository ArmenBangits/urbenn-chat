export interface IMessage {
  message: string
  id?: number
  receiverUserId: number
  senderUserId: number
  creationDate: string
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
