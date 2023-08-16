import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { useState, useEffect } from 'react'
import useAuthentication from './hooks/useAuthentication'

// Context

import {AuthProvider} from './context/AuthContext'

// Import Pages -------------------------
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

// Import Components --------------------
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  console.log(user)

  if(loadingUser){
    return <p>Loading...</p>
  }

  return (
    <>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/'  element={<Home/>} />
              <Route path='/about'  element={<About/>} />
              <Route path='/login'  element={!user ? <Login/> : <Navigate to="/" />} />
              <Route path='/register'  element={!user ? <Register/> : <Navigate to="/" />} />
              <Route path='/dashboard'  element={user ? <Dashboard/> : <Navigate to="/login" />}/>
              <Route path='/posts/create'  element={user ? <CreatePost/> : <Navigate to="/login" />} />
            </Routes>
          </div>  
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
