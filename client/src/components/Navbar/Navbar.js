import React from 'react'
import { IoHome, IoPersonCircle } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import "./Navbar.css"


function Navbar() {
  return (
    <>
        <header className='navbar-nav'>
           <div className='navbar-navContainer'>
              <h3 className='navbar-navLogo'>InstantMessenger</h3>
              <ul className='navbar-navList'>
                <li className='navbar-navItem'>
                  <Link className='navbar-navLink'to={'/'}><IoHome className='navbar-navIcon navbar-homeIcon'/></Link>
                </li>
                <li className='navbar-navItem'>
                  <Link className='navbar-navLink' to={'/login'}><IoPersonCircle className='navbar-navIcon navbar-profileIcon'/></Link>
                </li>
              </ul>
           </div>
        </header>
    </>
  )
}

export default Navbar