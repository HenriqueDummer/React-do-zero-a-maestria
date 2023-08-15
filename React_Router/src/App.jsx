import { useState } from 'react'
import './App.css'

//---- Import React Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//---- Import Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Product from './pages/Product/Product'
import Info from './pages/Info/Info'
import NotFound from './pages/NotFound/NotFound'
import Search from './pages/Search/Search'

//---- Import Components
import Navbar from './components/Navbar'
import SearchForm from './components/SearchForm'


function App() {

  return (
    <>
      <h1>React Router</h1>
      <BrowserRouter>
        <Navbar />
        {/* Search */}
        <SearchForm />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
           
          {/* Dinamic Route */}
          <Route path='/products/:id' element={<Product />}/>

          {/* Nested Route */}
          <Route path='/products/:id/info' element={<Info />} />

          {/* Search */}
          <Route path='/search' element={<Search />}/>

          {/* Redirect */}
          <Route path="/company" element={<Navigate to="/about"/>} />

          {/* 404 */}
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
