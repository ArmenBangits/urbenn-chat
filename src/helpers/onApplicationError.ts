import cogoToast from 'cogo-toast'
import { Dispatch } from 'react'
import { actionCreators as globalStateActionCreators } from '../ducks/appStates'

export default function onApplicationError(
  error: Error,
  dispatch: Dispatch<any>
) {
  console.log(error)
  if (error.message.includes('@CHAT_SERVICE_ERROR'))
    throw new Error(error.message)

  dispatch(globalStateActionCreators.changeErrorContainer('chat-global-crash'))
}

export const showErrorAlert = (msg: string) =>
  cogoToast.error(msg, {
    position: 'top-right',
    hideAfter: 200
  })
