import React, { useEffect } from 'react'
import { useState } from 'react'

import useAuthentication from '../../hooks/useAuthentication'

import styles from "./Login.module.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const {login, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      email,
      password
    }

    const res = await login(user)

    console.log(user)
  }

  useEffect(() => {
    setError(authError)
  }, [authError])

  return (
    <div className={styles.login_container}>
        <h1>Login to your account</h1>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
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

          {!loading && <button>Login</button>}
          {loading && <button className='disabled' disabled>Await</button>}
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login