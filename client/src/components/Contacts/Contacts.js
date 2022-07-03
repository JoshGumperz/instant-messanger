import React from 'react'
import UserBox from '../UserBox/UserBox'
import { getTokenAndDecode } from '../../utils/auth'
import './Contacts.css'


function Contacts() {
  const user = getTokenAndDecode();
  console.log(user)
  return (
    <div className='contacts-container'>
        <h4 className='contacts-header'>Contacts</h4>
        <div className='contacts-inputContainer'>
            <input type='text' placeholder='search contacts' className='contacts-input'/>
        </div>
        <div className='contacts-boxContainer'>
            <UserBox conversation={{name: "Mike"}} contact={true}/>
            <UserBox conversation={{name: "Lucas"}} contact={true}/>
            <UserBox conversation={{name: "teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest"}} contact={true}/>
        </div>
        <div className='contacts-addContactsContainer'>
            <p className='contacts-addContacts'>add contacts +</p>
        </div>
    </div>
  )
}

export default Contacts