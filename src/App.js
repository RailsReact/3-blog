import React from 'react'
import PostList from './post/PostList'

const posts = [
  {title: "React Hooks", content: "The greatest thing since sliced bread!", author: "Barbaley"},
  {title: "Using Fragments", content: "Keeping the DOM tree clean.", author: "Alisa Fox"}
]

export default function App (){
  return <PostList posts = {posts} />
}
