import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UrbennChat, { ChatSection, messageHub } from 'urbenn-chat'
import 'urbenn-chat/'
import 'urbenn-chat/src/assets/style.scss'

const App = () => {
  const [isOpened, setIsOpened] = useState(false)

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
            baseChatHubUrl='https://localhost:44311'
            baseUrl='https://localhost:44311/api'
            baseHubUrl='https://localhost:44320'
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0NzQiLCJlbWFpbCI6InZhcmRhbmJhbmdpdHNAZ21haWwuY29tIiwiVXNlckNhdGVnb3J5SWQiOiIyIiwiSXNCbG9ja2VkIjoiRmFsc2UiLCJuYmYiOjE2MzA4NDU2NjAsImV4cCI6MTYzMDg3NDQ2MCwiaWF0IjoxNjMwODQ1NjYwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxMS8ifQ.4mE4hlufylWAITHlX9OZidqXBIwcjYyr0X9Fb3wP13o'
            userId={497}
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
            userCategoryId={2}
          />
        </Route>

        <Route path='/chat-section/2' exact>
          <ChatSection
            baseChatHubUrl='https://localhost:44311'
            baseUrl='https://localhost:44311/api'
            baseHubUrl='https://localhost:44320'
            token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0NzUiLCJlbWFpbCI6InZydG9zZWxsZXJAbWFpbGluYXRvci5jb20iLCJVc2VyQ2F0ZWdvcnlJZCI6IjEiLCJJc0Jsb2NrZWQiOiJGYWxzZSIsIm5iZiI6MTYzMDc2Njg0OSwiZXhwIjoxNjMwNzk1NjQ5LCJpYXQiOjE2MzA3NjY4NDksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzExLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzExLyJ9.UozhOgf8nAhXoDxVCre2nqCfdJPYcy9B5U4ihqh5LJw'
            userId={733}
            fileExtensionsPath={process.env.PUBLIC_URL + '/extenssions/'}
            userCategoryId={1}
          />
        </Route>

        <Route path='/test1'>
          {isOpened && (
            <UrbennChat
              userId={497}
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0NzUiLCJlbWFpbCI6InZydG9zZWxsZXJAbWFpbGluYXRvci5jb20iLCJVc2VyQ2F0ZWdvcnlJZCI6IjEiLCJJc0Jsb2NrZWQiOiJGYWxzZSIsIm5iZiI6MTYzMDc2Njg0OSwiZXhwIjoxNjMwNzk1NjQ5LCJpYXQiOjE2MzA3NjY4NDksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzExLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzExLyJ9.UozhOgf8nAhXoDxVCre2nqCfdJPYcy9B5U4ihqh5LJw'
              chatId='612bc7d34d6b8b276d159ca4'
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
              token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0NzUiLCJlbWFpbCI6InZydG9zZWxsZXJAbWFpbGluYXRvci5jb20iLCJVc2VyQ2F0ZWdvcnlJZCI6IjEiLCJJc0Jsb2NrZWQiOiJGYWxzZSIsIm5iZiI6MTYzMDc2Njg0OSwiZXhwIjoxNjMwNzk1NjQ5LCJpYXQiOjE2MzA3NjY4NDksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzExLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzExLyJ9.UozhOgf8nAhXoDxVCre2nqCfdJPYcy9B5U4ihqh5LJw'
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
