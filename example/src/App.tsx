import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UrbennChat from 'urbenn-chat'
import 'urbenn-chat/'
import 'urbenn-chat/src/assets/style.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/test1'>
          <UrbennChat
            baseUrl='https://localhost:44320'
            senderUserId={5}
            receiverUserId={2}
          />
        </Route>
        <Route path='/test2'>
          <UrbennChat
            baseUrl='https://localhost:44320'
            senderUserId={2}
            receiverUserId={5}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
