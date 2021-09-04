import React from 'react'
import { toast } from 'react-toastify'
import { MessageIcon } from '../icons'
import { ChatTypeNamesForNotification, ChatUsersInfoResponse } from '../types'

export const showNotificationAlert = (chat: ChatUsersInfoResponse) => {
  toast(
    <div className='text-dark d-flex align-items-center text-break'>
      <MessageIcon className='mr-3' />У вас новое сообщение по{' '}
      {ChatTypeNamesForNotification[chat.chatTypeId]} № {chat.chatTypeDataId}
    </div>
  )
}
