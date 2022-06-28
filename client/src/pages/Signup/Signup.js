import React from 'react'
import LoginBox from '../../components/LoginBox/LoginBox'
import './Signup.css'

function Login() {
  return (
    <div className='signup-container'>
        <LoginBox loginOrSignup={'signup'}/>
    </div>
  )
}

export default Login