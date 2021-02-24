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
            senderUserId={228}
            receiverUserId={229}
            componentProps={{
              fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/',
              receiverName: 'Контактное лицо',
              senderName: 'Контактное лицо',
              receiverImage: 'asd',
              senderImage: 'asd'
            }}
            opened={isOpened}
            chatTitle='Sas Group - Запрос №19'
            chatTitleImage='https://hirebee-main-new.s3.amazonaws.com/staff.am/upload/4/3/5/d/435ddb14.png'
            sendingWithRequests={{
              messageTypeId: 1,
              messageTypeDataId: 12
            }}
            onClose={() => setIsOpened(false)}
          />
        </Route>
        <Route path='/test2'>
          <UrbennChat
            baseUrl='https://localhost:44320'
            senderUserId={230}
            receiverUserId={229}
            componentProps={{
              fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/',
              receiverName: 'Контактное лицо',
              senderName: 'Контактное лицо',
              receiverImage: 'asd',
              senderImage: 'asd'
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
