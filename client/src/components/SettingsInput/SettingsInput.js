import React, { useEffect, useState } from 'react'
import { IoEyeSharp, IoEyeOutline } from 'react-icons/io5'
import './SettingsInput.css'

function SettingsInput({ type, cancelClicked, updateBody, updateCancelClicked, updateErrMessage }) {
  const [showPassword, setShowPassword] = useState(false)
  const [inputVal, setInputVal] = useState('')
  

  
  useEffect(() => {
    if(cancelClicked) {
      setInputVal('')
      updateCancelClicked(false)
    }
  }, [cancelClicked])

  useEffect(() => {
    if(inputVal) {
      const bodyToSend = type === 'email' ? { email: inputVal } : type === 'username' ? { username: inputVal} : { password: inputVal }
      updateBody(bodyToSend, type)
    } else {
      updateBody(false, type)
    }
  }, [inputVal])



  return (
    <div className='si-container'>
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
        onClick={() => {updateErrMessage('')}}
        onChange={(e) => {setInputVal(e.target.value)}}/>
        
        { type === 'password' && !showPassword ? <IoEyeSharp className='si-icon' onClick={() => {setShowPassword(!showPassword)}}/> : type === 'password' && <IoEyeOutline className='si-icon' onClick={() => {setShowPassword(!showPassword)}}/> }
      </div>
    </div>
  )
}

export default SettingsInput