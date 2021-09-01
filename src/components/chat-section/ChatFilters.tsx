import { Tab, Tabs } from '@material-ui/core'
import React from 'react'

const ChatFilters = () => {
  return (
    <React.Fragment>
      <Tabs indicatorColor='primary' textColor='primary' centered>
        <Tab label='Item One' />
        <Tab label='Item Two' />
        <Tab label='Item Three' />
      </Tabs>
    </React.Fragment>
  )
}

export default ChatFilters
