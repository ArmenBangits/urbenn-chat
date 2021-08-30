// import 'bootstrap/scss/bootstrap.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
// import 'ti-icons/css/themify-icons.css'
import { ChatComponent } from './components/main'
import { russianTranslations } from './config'
import setBaseUrl from './helpers/setBaseUrl'
import store from './store'
import { IChatTranslations } from './types'
import { IComponentProps } from './types/main/index'

export interface IChatProps {
  baseUrl?: string
  baseHubUrl?: string
  chatId: string
  accessToken: string

  translations?: IChatTranslations

  componentProps: IComponentProps
  opened?: boolean

  sendingWithRequests?: Object

  onClose: () => void
}

const Chat: React.FC<IChatProps> = (baseProps) => {
  const { baseUrl, opened } = baseProps

  useEffect(() => {
    setBaseUrl(baseUrl || '')
  }, [])

  if (!opened) return null

  return (
    <Provider store={store}>
      <ChatComponent {...baseProps} />
    </Provider>
  )
}

Chat.defaultProps = {
  translations: russianTranslations,
  opened: true
}

export default Chat
