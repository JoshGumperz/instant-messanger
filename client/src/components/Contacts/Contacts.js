import React from 'react'
import UserBox from '../UserBox/UserBox'
import './Contacts.css'

function Contacts() {
  return (
    <div className='contacts-container'>
        <h4 className='contacts-header'>Contacts</h4>
        <div className='contacts-inputContainer'>
            <input type='text' placeholder='search contacts' className='contacts-input'/>
        </div>
        <div className='contacts-boxContainer'>
            <div>test</div>
        </div>
        <div className='contacts-addContactsContainer'>
            <p className='contacts-addContacts'>add contacts +</p>
        </div>
    </div>
  )
}

export default Contacts