import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UrbennChat, { ChatSection, messageHub } from 'urbenn-chat'
import 'urbenn-chat/'
import 'urbenn-chat/src/assets/style.scss'

const App = () => {
  const [isOpened, setIsOpened] = useState(true)

  useEffect(() => {
    messageHub.subscribeForChatUnReadMessagesCount({
      baseHubUrl: 'https://localhost:44320',
      userId: 733,
      onCountUpdate: console.log
    })
  }, [])

  return (
    <Router>
      <button onClick={() => setIsOpened(!isOpened)}>Open</button>

      <Switch>
        <Route path='/chat-section' exact>
          <ChatSection
            baseUrl='https://localhost:44395/api'
            baseHubUrl='https://localhost:44320'
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3MzMiLCJlbWFpbCI6InVyYmVuMzMzQG1haWxpbmF0b3IuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIxIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzA0Mjg3MzksImV4cCI6MTYzMDQ1NzUzOSwiaWF0IjoxNjMwNDI4NzM5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.5lAqYujNGt2m4bKPaC8SVEXcM1AlGS4KCUJ_qkj3nks'
            userId={497}
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
          />
        </Route>

        <Route path='/chat-section/2' exact>
          <ChatSection
            baseUrl='https://localhost:44395/api'
            baseHubUrl='https://localhost:44320'
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3MzMiLCJlbWFpbCI6InVyYmVuMzMzQG1haWxpbmF0b3IuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIxIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzA0Mjg3MzksImV4cCI6MTYzMDQ1NzUzOSwiaWF0IjoxNjMwNDI4NzM5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.5lAqYujNGt2m4bKPaC8SVEXcM1AlGS4KCUJ_qkj3nks'
            userId={733}
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
          />
        </Route>

        <Route path='/test1'>
          {isOpened && (
            <UrbennChat
              userId={497}
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3MzMiLCJlbWFpbCI6InVyYmVuMzMzQG1haWxpbmF0b3IuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIxIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzA0Mjg3MzksImV4cCI6MTYzMDQ1NzUzOSwiaWF0IjoxNjMwNDI4NzM5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.5lAqYujNGt2m4bKPaC8SVEXcM1AlGS4KCUJ_qkj3nks'
              chatId='612bc7d34d6b8b276d159ca4'
              baseUrl='https://localhost:44395/api'
              baseHubUrl='https://localhost:44320'
              componentProps={{
                fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/'
              }}
              opened={isOpened}
              onClose={() => setIsOpened(false)}
            />
          )}
        </Route>
        <Route path='/test2'>
          {isOpened && (
            <UrbennChat
              userId={733}
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3MzMiLCJlbWFpbCI6InVyYmVuMzMzQG1haWxpbmF0b3IuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIxIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzA0Mjg3MzksImV4cCI6MTYzMDQ1NzUzOSwiaWF0IjoxNjMwNDI4NzM5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.5lAqYujNGt2m4bKPaC8SVEXcM1AlGS4KCUJ_qkj3nks'
              chatId='612bc7d34d6b8b276d159ca4'
              baseUrl='https://localhost:44395/api'
              baseHubUrl='https://localhost:44320'
              componentProps={{
                fileExtensionsPath: process.env.PUBLIC_URL + '/extenssions/'
              }}
              onClose={() => setIsOpened(false)}
            />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
