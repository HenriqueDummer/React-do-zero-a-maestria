import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <ul>
            <li ><NavLink to={"/"} className='nav_link'>Home</NavLink></li>
            <li><NavLink to={"/product"} className='nav_link'>Product</NavLink></li>
            <li><NavLink to={"/about"} className='nav_link'>About</NavLink></li>
        </ul>
        
    </nav>
  )
}

export default Navbar