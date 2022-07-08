import React, {useState} from 'react'
import SettingsInput from '../../components/SettingsInput/SettingsInput'
import { getTokenAndDecode } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls'
import './Settings.css'

function Settings() {
  const user = getTokenAndDecode();
  const [saveClicked, setSaveClicked] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)

  const updateCancelClicked = (value) => {
    setCancelClicked(value)
  }

  const saveSettings = async (body) => {
    try {
      const response = await userRequest(`/api/user/${user.id}`, 'PUT', body)
      if(response.ok) {
        setSaveClicked(false)
      } else {
        const json = await response.json()
        console.log('err:', json)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='settings-container'>
        <div className='settings-box'>
            <div className='settings-inputContainer'>
              <SettingsInput type={'email'} saveSettings={saveSettings} saveClicked={saveClicked} cancelClicked={cancelClicked} updateCancelClicked={updateCancelClicked}/>
              <SettingsInput type={'username'} saveSettings={saveSettings} saveClicked={saveClicked} cancelClicked={cancelClicked} updateCancelClicked={updateCancelClicked}/>
              <SettingsInput type={'password'} saveSettings={saveSettings} saveClicked={saveClicked} cancelClicked={cancelClicked} updateCancelClicked={updateCancelClicked}/>
            </div>
            <div className='settings-deleteAccountContainer'>
              <button className='settings-deleteAccount'>delete account</button>
            </div>
            <div className='settings-btnContainer'>
                <button className='settings-btn settings-cancel' onClick={() => {setCancelClicked(true)}}>cancel</button>
                <button className='settings-btn settings-save' onClick={() => {setSaveClicked(true)}}>save</button>
            </div>
        </div>
    </div>
  )
}

export default Settings