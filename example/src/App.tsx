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
            baseUrl='https://localhost:44311/api'
            baseHubUrl='https://localhost:44320'
            userId={968}
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NjgiLCJlbWFpbCI6ImJ1eWVyYnV5ZXI1OTNAZ21haWwuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIyIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzI2NzMwNjcsImV4cCI6MTYzMjcwMTg2NywiaWF0IjoxNjMyNjczMDY3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.USmh6GqsNFwfPRC7dunZTf1dMVC2QladmiW8Nvh_Uks'
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
            userCategoryId={2}
            // userTypeId={7}
          />
        </Route>

        <Route path='/chat-section/2' exact>
          <ChatSection
            baseChatHubUrl='https://localhost:44311'
            baseUrl='https://localhost:44395/api'
            baseHubUrl='https://localhost:44320'
            userId={971}
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NzEiLCJlbWFpbCI6InRlc3QtZHJlc3Npb0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMSIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjMyNjcyODk0LCJleHAiOjE2MzI3MDE2OTQsImlhdCI6MTYzMjY3Mjg5NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIn0.DiI6iWJzJXf6Khm23RNjr4ugTANaJHxPMQ8cn5dWnHk'
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
            userCategoryId={1}
          />
        </Route>

        <Route path='/test1'>
          {isOpened && (
            <UrbennChat
              userId={968}
              baseChatHubUrl='https://localhost:44311'
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NjgiLCJlbWFpbCI6ImJ1eWVyYnV5ZXI1OTNAZ21haWwuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIyIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzI2NzMwNjcsImV4cCI6MTYzMjcwMTg2NywiaWF0IjoxNjMyNjczMDY3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.USmh6GqsNFwfPRC7dunZTf1dMVC2QladmiW8Nvh_Uks'
              chatId='614de305241135464d25ee9f'
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
              userId={971}
              baseChatHubUrl='https://localhost:44311'
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NzEiLCJlbWFpbCI6InRlc3QtZHJlc3Npb0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMSIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjMyNjcyODk0LCJleHAiOjE2MzI3MDE2OTQsImlhdCI6MTYzMjY3Mjg5NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIn0.DiI6iWJzJXf6Khm23RNjr4ugTANaJHxPMQ8cn5dWnHk'
              chatId='614de305241135464d25ee9f'
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
