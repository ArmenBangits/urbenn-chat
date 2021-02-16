import React from 'react'
import { useDispatch } from 'react-redux'

const ChatComponent = () => {
  const dispatch = useDispatch()

  return (
    <input
      type='text'
      onChange={() => {
        dispatch({
          type: 'TEST'
        })
      }}
    />
  )
}

export default ChatComponent
