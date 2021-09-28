import { IChatTranslations } from '../types'

export const MODULE_NAME = '@CHAT_SERVICE'
export const SOUNDS = {
  notification: 'https://urbenn.ru/public/notifsound.mp3'
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

export const MESSAGES_PAGE_SIZE = 10
export const CHATS_PAGE_SIZE = 1000
export const PAGINATION_LOADING_PIXELS = 50
export const MAX_FILE_LENGTH = 5
export const MAX_FILE_SIZE = 10485760
export const FILTER_CALL_WAIT = 1000
export const INPUT_CHAT_MAX_LENGTH = 450
export const SEARCH_FILTER_MAX_LENGTH = 7
export const MESSAGE_NOTIFICATION_LIMIT = 10

export const DEFAULT_MIMETYPES =
  'application/x-zip-compressed, image/x-png, image/gif, image/jpeg, image/png, application/pdf, application/rtf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/gif,	application/zip, application/vnd.rar'

export const CHAT_INITIAL_PROPS = {
  acceptFiles: DEFAULT_MIMETYPES
}
