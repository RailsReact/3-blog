import React, {useReducer, useEffect, useState} from 'react'
import { useResource } from "react-request-hook"
import { ThemeContext, StateContext } from './contexts'
import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import appReducer from './reducers'
import Header from './Header'
import ChangeTheme from './ChangeTheme'

export default function App (){
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const {user, error} = state 
  const [theme, setTheme] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })

  const [posts, getPosts] = useResource(() =>({
    url: '/posts',
    method: 'get'
  }))

  useEffect(getPosts, [])

  useEffect(() => {
    if (posts &&posts.error){
      dispatch({ type: 'POSTS_ERROR'})
    }
    if (posts &&posts.data){
      dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse()})
    }
  }, [posts])

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`
    } else {
      document.title = 'React Hooks Blog'
    }
  }, [user])

  return(
    <StateContext.Provider value={{state, dispatch}}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <Header text="React Hooks Blog" />
          <ChangeTheme
            theme={theme}
            setTheme={setTheme}
          />
          <br />
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
          <br />
         { user && <CreatePost />}
          <br />
          <hr />
          {error &&<b>{error}</b>}
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}
