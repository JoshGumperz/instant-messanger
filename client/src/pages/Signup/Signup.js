import React from 'react'
import LoginBox from '../../components/LoginBox/LoginBox'
import './Signup.css'

function Signup({setLoggedIn}) {
  return (
    <div className='signup-container'>
        <LoginBox setLoggedIn={setLoggedIn} loginOrSignup={'signup'}/>
    </div>
  )
}

export default Signup