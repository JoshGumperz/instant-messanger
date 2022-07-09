import { useState, useEffect} from 'react'
import { IoHome, IoPersonCircle } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import "./Navbar.css"


function Navbar({ userLoggedIn, setLoggedIn }) {
  const [openDropDown, setOpenDropDown] = useState(false)
  const [count, setCount] = useState(0)

  const toggleDropdown = () => {
    if (count >= 1) {
      setOpenDropDown(false)
    }
    setCount(count + 1)
  }

  useEffect(() => {
    if (!openDropDown) {
      setCount(0)
    }
  }, [openDropDown])

  // console.log('userLoggedIn from navbar:', userLoggedIn)
  return (
    <>
        <header className='navbar-nav'>
           <div className='navbar-navContainer'>
              <h3 className='navbar-navLogo'>InstantMessenger</h3>
              {userLoggedIn ? 
                <ul className='navbar-navList'>
                  <li className='navbar-navItem'>
                    <Link className='navbar-navLink'to={'/'}><IoHome className='navbar-navIcon navbar-homeIcon'/></Link>
                  </li>
                  <li className='navbar-navItem'>
                    <p className='navbar-navLink' onClick={() => {setOpenDropDown(true)}}><IoPersonCircle className='navbar-navIcon navbar-profileIcon'/></p>
                  </li>
                </ul> 
              : null}
              {openDropDown ? <Dropdown closeDropdown={toggleDropdown} setLoggedIn={setLoggedIn}/> : null }
           </div>
        </header>
    </>
  )
}

export default Navbar