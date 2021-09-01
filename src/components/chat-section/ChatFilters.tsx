import { Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { SearchIcon } from '../../icons'
import cx from 'classnames'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ChatFilters = () => {
  const [value, setValue] = useState(0)

  const [isOpenedSearch, setOpenedSearch] = useState(false)
  const [radioValue, setRadioValue] = useState('female')

  return (
    <React.Fragment>
      <div
        className={cx('filters', {
          ['filters--search-opened']: isOpenedSearch
        })}
      >
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          centered
          onChange={(_, x) => setValue(x)}
        >
          <Tab label='Все' />
          <Tab label='Запрос' />
          <Tab label='Заказы' />
          <Tab label='Админ' />

          <button
            type='button'
            className='filters__search MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary'
            onClick={() => setOpenedSearch(!isOpenedSearch)}
          >
            <SearchIcon />
          </button>
        </Tabs>

        <input
          placeholder='Найти сообщение'
          type='text'
          className='filters__search-input'
        />
      </div>

      <RadioGroup
        aria-label='gender'
        name='gender1'
        value={radioValue}
        onChange={(e) => setRadioValue(e.target.value)}
      >
        <FormControlLabel value='female' control={<Radio checkedIcon={<div>Checked</div>} />} label='Female' />
        <FormControlLabel value='male' control={<Radio checkedIcon={<div>Checked</div>} />} label='Male' />
        <FormControlLabel value='other' control={<Radio checkedIcon={<div>Checked</div>} />} label='Other' />
      </RadioGroup>
    </React.Fragment>
  )
}

export default ChatFilters
