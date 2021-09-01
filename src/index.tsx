// import 'bootstrap/scss/bootstrap.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
// import 'ti-icons/css/themify-icons.css'
import {
  ChatComponent,
  ChatSection as ChatSectionComp
} from './components/main'
import { ChatSectionProps } from './components/main/ChatSection'
import { russianTranslations } from './config'
import setBaseUrl, { setToken } from './helpers/setBaseUrl'
import store from './store'
import { IChatTranslations } from './types'
import { IComponentProps } from './types/main/index'

export interface IChatProps {
  baseUrl?: string
  baseHubUrl?: string
  token?: string
  chatId: string
  userId: number

  translations?: IChatTranslations

  componentProps: Partial<IComponentProps>
  opened?: boolean

  sendingWithRequests?: Object

  onClose: () => void
}

const Chat: React.FC<IChatProps> = (baseProps) => {
  const { baseUrl, opened, token } = baseProps

  useEffect(() => {
    setBaseUrl(baseUrl || '')
    setToken(token || '')
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

export const ChatSection: React.FC<
  ChatSectionProps & { baseUrl?: string; token?: string }
> = ({ baseUrl, token, ...props }) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setBaseUrl(baseUrl || '')
    setToken(token || '')

    setInitialized(true)
  }, [])

  if (!initialized) return null

  return (
    <div id='chat-section'>
      <Provider store={store}>
        <ChatSectionComp {...props} />
      </Provider>
    </div>
  )
}

export { messageHub } from './services'
