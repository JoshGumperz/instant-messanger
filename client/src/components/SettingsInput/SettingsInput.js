import React, { useState } from 'react'

function SettingsInput({type}) {
  const [showPassword, setShowPassword] = useState(false)
  const [inputVal, setInputVal] = useState('')

  return (
    <div className='si-container'>
      <div className='si-inputContainer'>
        <label className='si-label'>Change {type}:</label>
        <input type={
          type === 'password' && !showPassword ? 'password' 
        : type === 'email' ? 'email' 
        : 'text'} value={inputVal} required={true} onChange={(e) => {setInputVal(e.target.value)}}/>
      </div>
        {type === 'password' && 
        <div className='si-checkboxContainer'>
          <label className='si-label'>Show Password:</label>
          <input type={'checkbox'} value={showPassword} onChange={() => {setShowPassword(!showPassword)}} />
        </div>
        }
    </div>
  )
}

export default SettingsInput