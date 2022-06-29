import {useState} from "react"
import { Link, useHistory } from 'react-router-dom'
import { loginCall, signupCall } from "../../utils/apiCalls"
import './LoginBox.css'

function LoginBox({loginOrSignup}) {
  let history = useHistory();
  const signup = loginOrSignup === 'signup'
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('') 
  const [showPassword, setShowPassword] = useState(false)

  const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const validEmail = isValidEmail(email)
    const response = signup ? await signupCall(email, username, password) : await loginCall(email, password, validEmail)
    if(response.accessToken) {
      localStorage.setItem('JWTToken', response.accessToken);
      history.push('/')
    } else {
      setErrMessage(response.message)
    }
  }

  return (
    <div className='loginbox-container'>
        <h4 className="loginbox-header">{signup ? 'Signup' : 'Login'}</h4>
        <form className='loginbox-form' onSubmit={handleFormSubmit}>
          {errMessage ? <div className="loginbox-err-container"><p className="loginbox-err">{errMessage}</p></div> : null}
            <div className="loginbox-inputContainer">
                <label className="loginbox-label">{signup ? 'Email' : 'Email Or Username'}</label>
                <input type={signup ? 'email' : 'text'} className='loginbox-input' placeholder={signup ? 'enter email' : 'enter email or username'} required={true} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            { signup ? 
                <div className="loginbox-inputContainer">
                    <label className="loginbox-label">Username</label>
                    <input className='loginbox-input' type='text' placeholder='enter username' value={username} required={true} onChange={(e) => {setUsername(e.target.value)}}/>
                </div> 
                : null
            }
            <div className="loginbox-inputContainer">
                <label className="loginbox-label">Password</label>
                <input type={showPassword ? 'text' : 'password'} className='loginbox-input' placeholder='enter password' value={password} required={true} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className="loginbox-checkbox-container">
              <label className="loginbox-label">Show Password: </label>
              <input className="loginbox-checkbox" type={'checkbox'} value={showPassword} checked={showPassword} onChange={() => {setShowPassword(!showPassword)}}/>
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