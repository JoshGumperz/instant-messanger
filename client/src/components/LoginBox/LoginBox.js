import {useState} from "react"
import { Link, useHistory } from 'react-router-dom'
import { publicRequest } from "../../utils/apiCalls"
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import './LoginBox.css'

function LoginBox({setLoggedIn, loginOrSignup}) {
  let history = useHistory();
  const signup = loginOrSignup === 'signup'
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('') 
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const validEmail = isValidEmail(email)
    let response
    if (signup) {
      let bodyToSend = { email: email, username: username, password: password }
      response = await publicRequest('/api/register', 'POST', JSON.stringify(bodyToSend))
    } else {
      let bodyToSend = validEmail ? { email: email, password: password } : { username: email, password: password }
      response = await publicRequest('/api/login', 'POST', JSON.stringify(bodyToSend))
    }
    
    if(response.ok) {
      const json = await response.json()
      setIsLoading(false)
      setLoggedIn(true);
      localStorage.setItem('JWTToken', json.accessToken);
      history.push('/')
    } else {
      setIsLoading(false)
      const json = await response.json()
      console.log('fail', json)
      setErrMessage(json.message)
    }
  }

  return (
    <div className='loginbox-container'>
        <h4 className="loginbox-header">{signup ? 'Signup' : 'Login'}</h4>
        <form className='loginbox-form' onSubmit={handleFormSubmit}>
          {errMessage && <div className="loginbox-err-container"><p className="loginbox-err">{errMessage}</p></div> }
            <div className="loginbox-inputContainer">
                <label className="loginbox-label">{signup ? 'Email' : 'Email Or Username'}</label>
                <input name="email" type={signup ? 'email' : 'text'} className='loginbox-input' placeholder={signup ? 'enter email' : 'enter email or username'} required={true} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            { signup ? 
                <div className="loginbox-inputContainer">
                    <label className="loginbox-label">Username</label>
                    <input name="username" className='loginbox-input' type='text' placeholder='enter username' value={username} required={true} onChange={(e) => {setUsername(e.target.value)}}/>
                </div> 
                : null
            }
            <div className="loginbox-inputContainer">
                <label className="loginbox-label">Password</label>
                <input name="password" type={showPassword ? 'text' : 'password'} className='loginbox-input' placeholder='enter password' value={password} required={true} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className="loginbox-checkbox-container">
              <label className="loginbox-label">Show Password: </label>
              <input className="loginbox-checkbox" type={'checkbox'} value={showPassword} checked={showPassword} onChange={() => {setShowPassword(!showPassword)}}/>
            </div>
            <div className="loginbox-btnContainer">
                <button className={ isLoading ? 'loginbox-loading' : "loginbox-btn"}>{ isLoading ? <LoadingAnimation/> : signup ? 'Sign Up' : 'Log In'}</button>
            </div>
        </form>
        <div className="loginbox-linkContainer">
            <p className="loginbox-link-text">{signup ? 'already have an account? ' : 'dont have an account? '}<Link className="loginbox-link" to={signup ? '/login' : '/signup'}>{signup ? 'log in!' : 'create one!'}</Link></p>
        </div>  
    </div>
  )
}

export default LoginBox