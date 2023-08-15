import React from 'react'
import "./Navbar.css"

import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        {/* <Link className='nav_link' to="/">Home</Link>
        <Link className='nav_link' to="/about">About</Link> */}
        <NavLink className='nav_link' to={'/'}>Home</NavLink>
        <NavLink className='nav_link' to={'/about'}>About</NavLink>
    </nav>
  )
}

export default Navbar