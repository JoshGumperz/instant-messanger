import React, { useEffect, useState } from 'react'
import { IoEyeSharp, IoEyeOutline } from 'react-icons/io5'
import './SettingsInput.css'

function SettingsInput({ type, saveSettings, saveClicked, cancelClicked, updateSaveClicked, updateCancelClicked }) {
  const [showPassword, setShowPassword] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [errMessage, setErrMessage] = useState('')
  
  const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
  
  useEffect(() => {
    if(cancelClicked) {
      setInputVal('')
      updateCancelClicked(false)
    }
  }, [cancelClicked])

  useEffect(() => {
      const apiCall = async () => {
        const bodyToSend = type === 'email' ? { email: inputVal } : type === 'username' ? { username: inputVal} : { password: inputVal }
        await saveSettings(JSON.stringify(bodyToSend)); 
        setInputVal('')
      }

      if(saveClicked && inputVal) {
        if(type === 'email') {
          if(isValidEmail(inputVal)) { 
            apiCall() 
          } else { 
              setErrMessage('Please Enter A Valid Email Address')
              updateSaveClicked(false) 
          }
        } else if (!type === 'email' && !errMessage){
          apiCall();
        }
      }
  }, [saveClicked, type])



  return (
    <div className='si-container'>
      {errMessage && <div className='si-errMessage'>{errMessage}</div>}
      <div className='si-inputContainer'>
        <label className='si-label'>Change {type}:</label>
        <input type={
          type === 'password' && !showPassword ? 'password' 
        : type === 'email' ? 'email' 
        : 'text'} 
        placeholder={`enter a  new ${type}...`}
        value={inputVal} 
        required={true} 
        className={`si-input ${type === 'password' && 'si-password'}`}
        onClick={() => {type === 'email' &&  setErrMessage('')}}
        onChange={(e) => {setInputVal(e.target.value)}}/>
        
        { type === 'password' && !showPassword ? <IoEyeSharp className='si-icon' onClick={() => {setShowPassword(!showPassword)}}/> : type === 'password' && <IoEyeOutline className='si-icon' onClick={() => {setShowPassword(!showPassword)}}/> }
      </div>
    </div>
  )
}

export default SettingsInput