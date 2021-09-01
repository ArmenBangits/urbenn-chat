import { IChatTranslations } from '../types'

export const MODULE_NAME = '@CHAT_SERVICE'
export const SOUNDS = {
  notification:
    'https://proxy.notificationsounds.com/message-tones/pristine-609/download/file-sounds-1150-pristine.mp3'
}
export const russianTranslations: IChatTranslations = {
  textAreaPlaceholder: 'Написать сообщение',
  dateMessage: '',
  momentLocalization: 'ru',
  emojis: {
    activity: 'Активность',
    flags: 'Флаги',
    foods: 'Еда',
    notfound: 'Эмоджи не найдены',
    custom: 'Инструменты',
    nature: 'Природа',
    people: 'Люди',
    objects: 'Объекты',
    places: 'Места',
    recent: 'Последние использованные',
    search: 'Поиск',
    smileys: 'Смайлы',
    symbols: 'Символы'
  }
}
export const CHAT_INITIAL_PROPS = {
  acceptFiles: 'image/*, application/pdf, application/zip, application/msword'
}

export const MESSAGES_PAGE_SIZE = 10
export const CHATS_PAGE_SIZE = 10
export const PAGINATION_LOADING_PIXELS = 50
export const MAX_FILE_LENGTH = 5
export const MAX_FILE_SIZE = 10485760
