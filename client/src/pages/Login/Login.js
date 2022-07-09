import React from 'react'
import LoginBox from '../../components/LoginBox/LoginBox'
import './Login.css'

function Login({ setLoggedIn }) {
  return (
    <div className='login-container'>
      <LoginBox setLoggedIn={setLoggedIn} loginOrSignup={'login'}/>
    </div>
  )
}

export default Login