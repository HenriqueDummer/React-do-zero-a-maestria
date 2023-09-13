import React, { useEffect } from 'react'
import styles from './EditPost.module.css'

import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import useFetchDocument from '../../hooks/useFetchDocument';

const EditPost = () => {
    const {id} = useParams()
    const { postDocument: post } = useFetchDocument("posts", id)

    const {updateDocument, response} = useUpdateDocument("posts")

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")
    const {user} = useAuthValue()

    console.log(response)

    useEffect(() => {
        if(post){
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")
            setTags(textTags)
        }
    }, [post])

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

        const data = {
            title,
            image,
            body,
            tags: tagsArray, 
        }

        updateDocument(id, data)

        navigate("/dashboard")
    }

  return (
    <div className={styles.edit_post}>
        {post ? (
            <>
            <h2>Editig Post: {post.title}</h2>
            <p>Change your post details as you wish</p>
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
            <div className={styles.preview}>
                <p>Preview of the current image:</p>
                <img src={post.image} alt="" />
            </div>

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

            {!response.loading && <button>Save Edits</button>}
            {response.loading && <button className='disabled' disabled>Await</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
            </form>
            </>
        ) : (
            <>
            <p>Loading data...</p>
            </>
        )}
    </div>
  )
}

export default EditPost