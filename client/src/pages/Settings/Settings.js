import React, {useState} from 'react'
import SettingsInput from '../../components/SettingsInput/SettingsInput'
import { getTokenAndDecode, removeJSONWebToken } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls'
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { useHistory } from 'react-router-dom'
import './Settings.css'

function Settings() {
  const user = getTokenAndDecode();
  const [saveClicked, setSaveClicked] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)
  const history = useHistory();

  const updateCancelClicked = (value) => {
    setCancelClicked(value)
  }

  const updateSaveClicked = (value) => {
    setSaveClicked(value)
  }

  const deleteAccount = async () => {
    try {
      const response = await userRequest(`/api/user/${user.id}`, 'DELETE', null)
      if(response.ok) {
        deleteSucceeded();
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onClickDeleteAcc = () => {
    Confirm.ask(
      'Are you sure?',
      'Type DELETE to confirm',
      'DELETE',
      'Confirm',
      'Cancel',
      () => {
        deleteAccount();
      },
      () => {
        return
      }, 
      {
        titleColor:	'#1fa797',
        okButtonBackground: '#1fa797',
        cancelButtonBackground: '#a8a8a8'
      }
    )
  }

  const saveSucceeded = () => {
    Report.success(
      'Success',
      'Settings Saved',
      'Okay',
      );
  }

  const deleteSucceeded = () => {
    Report.success(
      'Success',
      'Account Deleted',
      'Okay',
      () => {
        removeJSONWebToken();
        history.push('/login')
      }
      );
  }

  const saveFailed = () => {
    Report.failure(
      'Failed To Save',
      'A user with that username or email already exists',
      'Okay',
      );
  }

  const saveSettings = async (body) => {
    try {
      const response = await userRequest(`/api/user/${user.id}`, 'PUT', body)
      if(response.ok) {
        saveSucceeded();
        setSaveClicked(false)
      } else {
        if(response.status === 409) {
          saveFailed();
        }
        setSaveClicked(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='settings-container'>
        <div className='settings-box'>
            <div className='settings-inputContainer'>
              <SettingsInput type={'email'} saveSettings={saveSettings} saveClicked={saveClicked} cancelClicked={cancelClicked} updateSaveClicked={updateSaveClicked} updateCancelClicked={updateCancelClicked}/>
              <SettingsInput type={'username'} saveSettings={saveSettings} saveClicked={saveClicked} cancelClicked={cancelClicked} updateSaveClicked={updateSaveClicked} updateCancelClicked={updateCancelClicked}/>
              <SettingsInput type={'password'} saveSettings={saveSettings} saveClicked={saveClicked} cancelClicked={cancelClicked} updateSaveClicked={updateSaveClicked} updateCancelClicked={updateCancelClicked}/>
            </div>
            <div className='settings-deleteAccountContainer'>
              <button className='settings-deleteAccount' onClick={onClickDeleteAcc}>delete account</button>
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