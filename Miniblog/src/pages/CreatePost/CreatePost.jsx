import React from 'react'
import styles from './CreatePost.module.css'

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocuments'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [formError, setFormError] = useState("")
  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }

    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase())

    if(!title || !image || !tags || !body){
      setFormError("Preencha todos os campos")
      return
    }

    if(formError) {
      return
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray, 
      uid: user.uid,
      createdBy: user.displayName
  })

  navigate("/")

  console.log("insert")
}

  return (
    <div className={styles.create_post}>
        <h2>Create Post</h2>
        <p>Write about whatever you want and share your knowlage</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title:</span>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder='Title of your post'
              value={title}
              onChange={(e) => setTitle(e.target.value)}  
            />
          </label>

          <label>
            <span>Image's URL:</span>
            <input 
              type="text" 
              name="image" 
              required 
              placeholder="URL of your post's image "
              value={image}
              onChange={(e) => setImage(e.target.value)}  
            />
          </label>

          <label>
            <span>Content:</span>
            <input 
              type="textarea" 
              name="body" 
              required 
              placeholder="Content of your post"
              value={body}
              onChange={(e) => setBody(e.target.value)}  
            />
          </label>

          <label>
            <span>Tags:</span>
            <input 
              type="text" 
              name="tags" 
              required 
              placeholder="Insert the tags spaced with a commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}  
            />
          </label>

          {!response.loading && <button>Create Post</button>}
          {response.loading && <button className='disabled' disabled>Await</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost