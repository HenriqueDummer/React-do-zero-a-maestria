import { useState } from 'react'
import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import './App.css'

// Import Pages ----------------------------------
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Product from './pages/Procuct/Product'

// Import Components -----------------------------
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <div className='App'>
      <h1>Context</h1>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/product' element={<Product />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
