import React from 'react'
import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'
import useFetchDocuments from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
  
  const {deleteDocument} = useDeleteDocument("posts")

  return (
    <div className={styles.dash_container}>
        <h2>Dashboard</h2>
        <p>Manage your posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.no_posts}>
            <p>No posts found</p>
            <Link to="/posts/create"><button>Create your first post</button></Link>
          </div>
        ) : (
          <div className={styles.posts}>
                <div className={styles.posts_header}>
                  <span>Title</span>
                  <span>Actions</span>
                </div>

                {posts && posts.map((post) =>
                <div className={styles.post} key={post.id}>
                  <p>{post.title}</p>
                  <div className={styles.post_btns}>
                    <Link to={`/posts/${post.id}`}>
                      <button>Read</button>
                    </Link>
                    <Link to={`/posts/edit/${post.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button className={styles.delete_btn} onClick={() => deleteDocument(post.id)}>
                      Delete
                    </button>
                  </div>
                </div>)}        
          </div>
        )}
    </div>
  )
}

export default Dashboard