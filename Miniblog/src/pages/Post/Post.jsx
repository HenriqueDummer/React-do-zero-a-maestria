import React from 'react'
import styles from './Post.module.css'

import { useParams } from 'react-router-dom'
import useFetchDocument from '../../hooks/useFetchDocument'

const Post = () => {
    const { id } = useParams()
    const {postDocument: post} = useFetchDocument("posts", id)
    console.log(post)
  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className={styles.body}>{post.body}</p>
          <img src={post.image} alt="" />
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => {
                return(
                    <p key={tag}><span>#</span>{tag}</p> 
                )
            })}
          </div>
          <p>By: {post.createdBy}</p>
        </>
      )}
        
    </div>
  )
}

export default Post