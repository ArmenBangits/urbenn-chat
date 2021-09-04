import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_CALL_WAIT } from '../../config'
import { getChats } from '../../ducks/chat'
import debounce from '../../helpers/debounce'
import { ChatTypes } from '../../types'
import { selectChatSectionComponentProps } from './../../ducks/appStates'
import ChatFilters from './ChatFilters'

type ChatFiltersContainerProps = {
  currentPage: number
}

const ChatFiltersContainer: React.FC<ChatFiltersContainerProps> = ({
  currentPage
}) => {
  const dispatch = useDispatch()

  const { userCategoryId } = useSelector(selectChatSectionComponentProps)

  const onFilterChange = useCallback(
    debounce(
      (chatType: ChatTypes | null, search: string) => {
        dispatch(getChats(currentPage, chatType, search))
      },
      FILTER_CALL_WAIT,
      ([chatType, search], [prevChatType, prevSearch]) => {
        return prevSearch === search && chatType === prevChatType
      }
    ),
    []
  )

  return <ChatFilters isAdmin={!userCategoryId} onChange={onFilterChange} />
}

export default ChatFiltersContainer
