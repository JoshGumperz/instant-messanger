import {useState} from "react"
import { Link } from 'react-router-dom'
import { loginCall, signupCall } from "../../utils/apiCalls"
import './LoginBox.css'

function LoginBox({loginOrSignup}) {
  const signup = loginOrSignup === 'signup'
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 

  const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const validEmail = isValidEmail(email)
    signup ? signupCall(email, username, password) : loginCall(validEmail ? email : username, password, validEmail)
  }

  return (
    <div className='loginbox-container'>
        <h4 className="loginbox-header">{signup ? 'Signup' : 'Login'}</h4>
        <form className='loginbox-form' onSubmit={handleFormSubmit}>
            <div className="loginbox-inputContainer">
                <label className="loginbox-label">{signup ? 'Email' : 'Email Or Username'}</label>
                <input type={signup ? 'email' : 'text'} className='loginbox-input' placeholder={signup ? 'enter email' : 'enter email or username'} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            { signup ? 
                <div className="loginbox-inputContainer">
                    <label className="loginbox-label">Username</label>
                    <input className='loginbox-input' type='text' placeholder='enter username' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </div> 
                : null
            }
            <div className="loginbox-inputContainer">
                <label className="loginbox-label">Password</label>
                <input type='text' className='loginbox-input' placeholder='enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className="loginbox-btnContainer">
                <button className="loginbox-btn">{signup ? 'Sign Up' : 'Log In'}</button>
            </div>
        </form>
        <div className="loginbox-linkContainer">
            <Link className="loginbox-link" to={signup ? '/login' : '/signup'}>{signup ? 'already have an account? log in!' : 'dont have an account? create one!'}</Link>
        </div>  
    </div>
  )
}

export default LoginBox