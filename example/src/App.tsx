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
          <button onClick={() => setIsOpened(!isOpened)}>Click</button>

          {isOpened && (
            <ChatSection
              baseChatHubUrl='https://localhost:5001'
              baseUrl='https://localhost:5001/api'
              baseHubUrl='https://localhost:44320'
              userId={968}
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMzQ5IiwiZW1haWwiOiJhN0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMiIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjQ5MjM3MzAxLCJleHAiOjE2NDkyNjYxMDEsImlhdCI6MTY0OTIzNzMwMSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIn0.EJHIpjBt7_sVcwFBVEn_UVkJhlGcunIPFaWfGnJrPV0'
              fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
              userCategoryId={2}
              defaultChatId='62456a6be463f7f37df5f3aa'
              // userTypeId={7}
            />
          )}
        </Route>

        <Route path='/chat-section/2' exact>
          <button onClick={() => setIsOpened(!isOpened)}>Click</button>

          {isOpened && (
            <ChatSection
              baseChatHubUrl='https://localhost:5001'
              baseUrl='https://localhost:5005/api'
              baseHubUrl='https://localhost:44320'
              userId={2345}
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMzQ1IiwiZW1haWwiOiJhM0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMSIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjQ5MjQ2OTIzLCJleHAiOjE2NDkyNzU3MjMsImlhdCI6MTY0OTI0NjkyMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIn0.BZPnkWMLHhT2GWN5TVybXI46umfJHAEXzRdZhDWI7_o'
              fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
              userCategoryId={1}
            />
          )}
        </Route>

        <Route path='/test1'>
          {isOpened && (
            <UrbennChat
              userId={968}
              baseChatHubUrl='https://localhost:5001'
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMzQ5IiwiZW1haWwiOiJhN0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMiIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjQ5MjM3MzAxLCJleHAiOjE2NDkyNjYxMDEsImlhdCI6MTY0OTIzNzMwMSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTEvIn0.EJHIpjBt7_sVcwFBVEn_UVkJhlGcunIPFaWfGnJrPV0'
              chatId='6151cd810806f55daee6d7e8'
              baseUrl='https://localhost:5001/api'
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
              userId={2345}
              baseChatHubUrl='https://localhost:5001'
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMzQ1IiwiZW1haWwiOiJhM0BtYWlsaW5hdG9yLmNvbSIsIlVzZXJDYXRlZ29yeUlkIjoiMSIsIklzQmxvY2tlZCI6IkZhbHNlIiwibmJmIjoxNjQ5MjQ2OTIzLCJleHAiOjE2NDkyNzU3MjMsImlhdCI6MTY0OTI0NjkyMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTUvIn0.BZPnkWMLHhT2GWN5TVybXI46umfJHAEXzRdZhDWI7_o'
              chatId='6151cd810806f55daee6d7e8'
              baseUrl='https://localhost:5005/api'
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
