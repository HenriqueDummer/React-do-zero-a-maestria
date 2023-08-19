import React from 'react'
import styles from "./Home.module.css"

import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import useFetchDocuments from '../../hooks/useFetchDocuments'

import PostDetail from '../../components/PostDetail/PostDetail'

const Home = () => {

  const [query, setQuery] = useState("")
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  console.log(posts)

  return (
    <div className={styles.posts_container}>
      <div className={styles.posts_header}>
        <h1>Most recent posts</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Or serach for tags...' 
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button><i className='bx bx-search'></i></button>
        </form>
      </div>
        <div className={styles.posts}>
          {loading && <p>Loading...</p>}
          {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>No posts found</p>
              <Link to="/posts/create">Add a post</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home