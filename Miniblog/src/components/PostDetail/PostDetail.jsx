import styles from './PostDetail.module.css'

import React from 'react'
import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
    <div className={styles.post}>
        <h2>{post.createdBy}</h2>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div className={styles.media_container}>
            <img src={post.image} alt={post.title} />
        </div>  
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => {
                return(
                   <p key={tag}><span>#</span>{tag}</p> 
                )
            })}
        </div>
        <Link to={`/posts/${post.id}`}><button className={styles.read_button}>Read</button></Link>
    </div>
  )
}

export default PostDetail