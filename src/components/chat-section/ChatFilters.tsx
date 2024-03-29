import { Tab, Tabs } from '@material-ui/core'
import cx from 'classnames'
import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SEARCH_FILTER_MAX_LENGTH } from '../../config'
import { selectChatSectionComponentProps } from '../../ducks/appStates'
import { SearchIcon } from '../../icons'
import { ChatTypes, UserCategories, UserTypes } from '../../types'

type ChatFiltersProps = {
  isAdmin: boolean
  onChange: (chatType: ChatTypes | null, search: string) => void
}

const ChatFilters: React.FC<ChatFiltersProps> = ({ onChange }) => {
  const { userCategoryId, userTypeId } = useSelector(
    selectChatSectionComponentProps
  )

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const [isOpenedSearch, setOpenedSearch] = useState(false)

  const [searchValue, setSearchValue] = useState('')

  const [chatType, setChatType] = useState<ChatTypes | null>(null)

  const onSearchButtonToggle = useCallback(() => {
    if (searchValue) onChange(null, '')

    if (!isOpenedSearch && searchInputRef.current)
      searchInputRef.current.focus()

    setOpenedSearch(!isOpenedSearch)
    setSearchValue('')
    setChatType(null)
  }, [onChange, isOpenedSearch, searchValue])

  const onSearchValueChange = useCallback(
    (e) => {
      if (e.target.value.trim() !== searchValue.trim())
        onChange(chatType, e.target.value.trim())

      setSearchValue(e.target.value.trim())
    },
    [chatType, onChange, searchValue]
  )

  const onChatTypeChange = useCallback(
    (_, chatType: ChatTypes | null) => {
      setChatType(chatType)
      setSearchValue('')

      onChange(chatType, '')
    },
    [onChange]
  )

  const onSearchInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    target.value = target.value.slice(0, SEARCH_FILTER_MAX_LENGTH)
  }, [])

  return (
    <React.Fragment>
      <div
        className={cx('filters mb-3', {
          'filters--search-opened':
            userCategoryId === UserCategories.TransportCompany ||
            userTypeId === UserTypes.INDIVIDUAL ||
            isOpenedSearch,
          'filters--hide-filters':
            userCategoryId === UserCategories.TransportCompany
        })}
      >
        <Tabs
          value={chatType}
          indicatorColor='primary'
          textColor='primary'
          centered
          onChange={onChatTypeChange}
        >
          <Tab label='Все' value={null} />
          {userCategoryId !== UserCategories.TransportCompany && (
            <Tab label='Запрос' value={ChatTypes.Request} />
          )}
          <Tab
            label='Заказы'
            value={
              userCategoryId === UserCategories.TransportCompany
                ? ChatTypes.TcOrder
                : ChatTypes.Order
            }
          />
          {userCategoryId !== UserCategories.TransportCompany && (
            <Tab label='Тендеры' value={ChatTypes.Tender} />
          )}

          {/* {!isAdmin && <Tab label='Админ' value={ChatTypes.Admin} />} */}

          <button
            type='button'
            className='filters__search MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary'
            onClick={onSearchButtonToggle}
          >
            <SearchIcon />
          </button>
        </Tabs>

        <input
          placeholder={`Поиск по номеру запроса, заказа${
            userCategoryId !== UserCategories.TransportCompany
              ? ', тендера'
              : ''
          }`}
          type='number'
          className='filters__search-input'
          value={searchValue}
          onChange={onSearchValueChange}
          maxLength={SEARCH_FILTER_MAX_LENGTH}
          autoFocus
          ref={searchInputRef}
          onInput={onSearchInput}
        />
      </div>
    </React.Fragment>
  )
}

export default ChatFilters
