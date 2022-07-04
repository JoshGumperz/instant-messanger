import { useState, useEffect } from 'react'
import { getTokenAndDecode } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls';
import UserBox from '../UserBox/UserBox'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import './Contacts.css'

function Contacts({ contacts, removeContact, addContact }) {
  const user = getTokenAndDecode();

  const addNewContact = async (contactId) => {
    let bodyToSend = { user1: user.id, user2: contactId }
    const response = await userRequest(`/api/conversation`, 'POST', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        const json =  await response.json();
        addContact(json)
      } else {
        const json = await response.json();
        console.log('error', json)
        return
      }
  }

  const findNewContact = async (username) => {
    const response = await userRequest(`/api/user/find/username/${username}`, 'GET', null) 
    try {
      if(response.ok) {
        const json =  await response.json();
        addNewContact(json._id)
        return
      } else {
        popupReport();
        return
      }
    } catch (err) {
      return popupReport();
    }
  } 

  const popupReport = () => {
    Report.failure(
      'User Doesnt Exist',
      'No user with that username found',
      'Okay',
      );
  }

  const popupPrompt = () => {
    Confirm.prompt(
      'Add Contact',
      'Enter Username',
      null,
      'Cancel',
      'Submit',
      () => {
      return
      },
      (clientAnswer) => {
        findNewContact(clientAnswer)
      },
      {
        titleColor:	'#1fa797',
        okButtonBackground: '#a8a8a8',
        cancelButtonBackground: '#1fa797'
      },
    );
  }

  return (
    <div className='contacts-container'>
        <h4 className='contacts-header'>Contacts</h4>
        <div className='contacts-inputContainer'>
            <input type='text' placeholder='search contacts' className='contacts-input'/>
        </div>
        <div className='contacts-boxContainer'>
          {contacts.length ? contacts.map((c, index) => {
              return (
                <UserBox key={index} contactId={c.members.find((m) => m !== user.id)} conversationId={c._id} removeContact={removeContact} recent={false} />
              )
            }) : <p>You have no contacts</p>}
        </div>
        <div className='contacts-addContactsContainer'>
            <p className='contacts-addContacts' onClick={popupPrompt}>add contacts +</p>
        </div>
    </div>
  )
}

export default Contacts