import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { userRequest } from '../../utils/apiCalls';
import { removeJSONWebToken } from '../../utils/auth';
import './Dropdown.css'

function Dropdown({ closeDropdown }) {
  const ref = useDetectClickOutside({ onTriggered: closeDropdown }); 
  let history = useHistory(); 

  const logout = async () => {
    await userRequest('/api/user/logout', 'POST', null);
    removeJSONWebToken();
    closeDropdown();
    history.push('/login')
  }

  return (
    <div className='dropdown-container' ref={ref}>
        <ul className='dropdown-list'>
            <li className='dropdown-listItem' onClick={closeDropdown}>
                <Link className='dropdown-link' to={'/settings'}>Settings</Link>
            </li>
            <li className='dropdown-listItem'>
                <p className='dropdown-link' onClick={logout}>Logout</p>
            </li>
        </ul>
    </div>
  )
}

export default Dropdown