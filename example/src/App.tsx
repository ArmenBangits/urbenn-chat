import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UrbennChat from 'urbenn-chat'
import 'urbenn-chat/'
import 'urbenn-chat/src/assets/style.scss'

const App = () => {
  const [isOpened, setIsOpened] = useState(true)

  return (
    <Router>
      <button onClick={() => setIsOpened(!isOpened)}>Open</button>
      <Switch>
        <Route path='/test1'>
          <UrbennChat
            userId={497}
            chatId='612bc7d34d6b8b276d159ca4'
            baseUrl='https://localhost:44395/api'
            baseHubUrl='https://localhost:44320'
            componentProps={{
              fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/'
            }}
            opened={isOpened}
            sendingWithRequests={{
              messageTypeId: 1,
              messageTypeDataId: 12
            }}
            onClose={() => setIsOpened(false)}
          />
        </Route>
        <Route path='/test2'>
          <UrbennChat
            userId={5}
            chatId='2'
            baseUrl=''
            baseHubUrl='https://localhost:44320'
            componentProps={{
              fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/'
            }}
            sendingWithRequests={{
              messageTypeId: 1,
              messageTypeDataId: 12
            }}
            onClose={() => setIsOpened(false)}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
