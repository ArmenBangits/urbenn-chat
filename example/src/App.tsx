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
      userId: 971,
      onCountUpdate: console.log
    })
  }, [])

  return (
    <Router>
      <button onClick={() => setIsOpened(!isOpened)}>Open</button>

      <Switch>
        <Route path='/chat-section' exact>
          <ChatSection
            baseChatHubUrl='https://localhost:44311'
            baseUrl='https://localhost:44395/api'
            baseHubUrl='https://localhost:44320'
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NzEiLCJlbWFpbCI6InRlc3QtZHJlc3Npb0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMSIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjMyNTg1NzM0LCJleHAiOjE2MzI2MTQ1MzQsImlhdCI6MTYzMjU4NTczNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIn0.tKjkZQWUD_K4XKPwbkZN1gEVgpsMC_6qa3jKrcAz0Vo'
            userId={971}
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
            userCategoryId={1}
          />
        </Route>

        <Route path='/chat-section/2' exact>
          <ChatSection
            baseChatHubUrl='https://localhost:44311'
            baseUrl='https://localhost:44311/api'
            baseHubUrl='https://localhost:44320'
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NjgiLCJlbWFpbCI6ImJ1eWVyYnV5ZXI1OTNAZ21haWwuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIyIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzI1ODU2OTksImV4cCI6MTYzMjYxNDQ5OSwiaWF0IjoxNjMyNTg1Njk5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.OJ_Ox54KIeBnb6KHMfThowK_agZsvgr8h2rLtALEgy4'
            userId={968}
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
            userCategoryId={2}
          />
        </Route>

        <Route path='/test1'>
          {isOpened && (
            <UrbennChat
              userId={927}
              baseChatHubUrl='https://localhost:44311'
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MjciLCJlbWFpbCI6Ijk5OWJ1eUBtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMiIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjMyNDM2Mzc5LCJleHAiOjE2MzI0NjUxNzksImlhdCI6MTYzMjQzNjM3OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIn0._USV4bwKge66p8-CfFuw4YdffQoyaO3Z_Qg-LZ9r6JY'
              chatId='614c463537046013d8fe42a3'
              baseUrl='https://localhost:44311/api'
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
              baseChatHubUrl='https://localhost:44311'
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0OTciLCJlbWFpbCI6Im1hcnllZ2hpYXphcnlhbjE2QGdtYWlsLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMiIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjMwODY5MjQ4LCJleHAiOjE2MzA4OTgwNDgsImlhdCI6MTYzMDg2OTI0OCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIn0._utUCJ0uX2lZ7PFrRghq0fmtqh618Jjuy-sHjQfkNb4'
              chatId='612bc7d34d6b8b276d159ca4'
              baseUrl='https://localhost:44311/api'
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
