import React from 'react'
import styles from "./About.module.css"

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <h1>About Mini <span>Blog</span></h1>

        <p>This project is a blog built with React in front-end and Firebase in back-end</p>
    
      <Link to="/posts/create">
        <button>
          Create Post
        </button>
      </Link>
    </div>
  )
}

export default About