import React from 'react'

import { useState, useEffect } from 'react'
import useAuthentication from '../../hooks/useAuthentication'

import styles from "./Register.module.css"

const Register = () => {
  
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    if (password!== confirmPassword) {
      setError("Passwords do not match")
      return
    } 

    const user = {
      displayName,
      email,
      password
    }

    const res = await createUser(user)

    console.log(user)
  }

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register_container}>
        <h1>Login to post</h1>
        <p>Create an user and share your stories</p>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <label>
            <span>Name:</span>
            <input 
              type="text" 
              name='displayName' 
              required 
              placeholder='Username' 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>

          <label>
            <span>Email:</span>
            <input 
              type="email" 
              name='email' 
              required 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </label>

          <label>
            <span>Password:</span>
            <input 
              type="password" 
              name='password' 
              required 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
          </label>

          <label>
            <span>Password:</span>
            <input type="password" 
              name='confirmPassword' 
              required 
              placeholder='Confirm your password' 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          {!loading && <button>Sign In</button>}
          {loading && <button className='disabled' disabled>Await</button>}
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register