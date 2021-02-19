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
            baseUrl='https://localhost:44320'
            senderUserId={5}
            receiverUserId={2}
            componentProps={{
              fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/',
              receiverName: 'Контактное лицо',
              senderName: 'Контактное лицо'
            }}
            opened={isOpened}
            chatTitle='Sas Group - Запрос №19'
            chatTitleImage='https://hirebee-main-new.s3.amazonaws.com/staff.am/upload/4/3/5/d/435ddb14.png'
            sendingWithRequests={{
              chatTypeId: 1
            }}
          />
        </Route>
        <Route path='/test2'>
          <UrbennChat
            baseUrl='https://localhost:44320'
            senderUserId={2}
            receiverUserId={5}
            componentProps={{
              fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/',
              receiverName: 'Контактное лицо',
              senderName: 'Контактное лицо'
            }}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
