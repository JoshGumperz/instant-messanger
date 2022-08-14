import React, {useState} from 'react'
import SettingsInput from '../../components/SettingsInput/SettingsInput'
import { getTokenAndDecode, removeJSONWebToken } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls'
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { useHistory } from 'react-router-dom'
import './Settings.css'

function Settings({setLoggedIn}) {
  const user = getTokenAndDecode();
  const [cancelClicked, setCancelClicked] = useState(false)
  const [body, setBody] = useState({})
  const [errMessage, setErrMessage] = useState('')
  const history = useHistory();

  const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const updateBody = (value, type) => {
    if(value) {
      const updatedBody = {...body, ...value};
      setBody(updatedBody)
    } else {
      if(type === 'email') {
        setBody(current => {
          const {email, ...rest} = current;
          return rest;
        });
      } else if(type === 'username') {
        setBody(current => {
          const {username, ...rest} = current;
          return rest;
        });
      } else {
        setBody(current => {
          const {password, ...rest} = current;
          return rest;
        });
      }
    }

  }

  const updateCancelClicked = (value) => {
    setCancelClicked(value)
  }

  const updateErrMessage = (value) => {
    setErrMessage(value)
  }

  const deleteAccount = async () => {
    try {
      const response = await userRequest(`/api/delete/${user.id}`, 'DELETE', null)
      if(response.ok) {
        deleteSucceeded();
      } else {
        if(response.status === 403) {
          setLoggedIn(false)
        }
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

  const saveSettings = async () => {
    if(!body.email && !body.username && !body.password) {
      setErrMessage("Please fill out at least one of the below fields")
      return 
    } else if (body.email && !isValidEmail(body.email)) {
      setErrMessage("Please enter a valid email in the email field")
      return 
    }
    try {
      const response = await userRequest(`/api/user/${user.id}`, 'PUT', JSON.stringify(body))
      if(response.ok) {
        saveSucceeded();
        setBody({});
      } else {
        if(response.status === 409) {
          saveFailed();
        } else if (response.status === 403) {
          setLoggedIn(false)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='settings-container'>
        <div className='settings-box'>
        {errMessage && <p className='settings-errMessage'>{errMessage}</p>}
            <div className='settings-inputContainer'>
              <SettingsInput type={'email'} updateErrMessage={updateErrMessage} cancelClicked={cancelClicked} updateBody={updateBody} updateCancelClicked={updateCancelClicked}/>
              <SettingsInput type={'username'} updateErrMessage={updateErrMessage} cancelClicked={cancelClicked} updateBody={updateBody} updateCancelClicked={updateCancelClicked}/>
              <SettingsInput type={'password'} updateErrMessage={updateErrMessage} cancelClicked={cancelClicked} updateBody={updateBody} updateCancelClicked={updateCancelClicked}/>
            </div>
            <div className='settings-deleteAccountContainer'>
              <button className='settings-deleteAccount' onClick={onClickDeleteAcc}>delete account</button>
            </div>
            <div className='settings-btnContainer'>
                <button className='settings-btn settings-cancel' onClick={() => {
                  setCancelClicked(true)
                  setBody({})
                }}>cancel</button>
                <button className='settings-btn settings-save' onClick={() => {saveSettings()}}>save</button>
            </div>
        </div>
    </div>
  )
}

export default Settings