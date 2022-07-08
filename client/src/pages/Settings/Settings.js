import React from 'react'
import SettingsInput from '../../components/SettingsInput/SettingsInput'
import './Settings.css'

function Settings() {
  return (
    <div className='settings-container'>
        <div className='settings-box'>
            <div className='settings-inputContainer'>
              <SettingsInput type={'email'}/>
              <SettingsInput type={'username'}/>
              <SettingsInput type={'password'}/>
            </div>
            <div className='settings-deleteAccountContainer'>
              <button className='settings-deleteAccount'>delete account</button>
            </div>
            <div className='settings-btnContainer'>
                <button className='settings-btn settings-cancel'>cancel</button>
                <button className='settings-btn settings-save'>save</button>
            </div>
        </div>
    </div>
  )
}

export default Settings