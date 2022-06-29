import React from 'react'
import { Link } from 'react-router-dom'
import { useDetectClickOutside } from 'react-detect-click-outside';
import './Dropdown.css'

function Dropdown({ closeDropdown }) {
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });  
  return (
    <div className='dropdown-container' ref={ref}>
        <ul className='dropdown-list'>
            <li className='dropdown-listItem' onClick={closeDropdown}>
                <Link className='dropdown-link' to={'/settings'}>Settings</Link>
            </li>
            <li className='dropdown-listItem'>
                <p className='dropdown-link' onClick={closeDropdown}>Logout</p>
            </li>
        </ul>
    </div>
  )
}

export default Dropdown