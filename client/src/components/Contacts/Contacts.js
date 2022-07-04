import { useState, useEffect } from 'react'
import { getTokenAndDecode } from '../../utils/auth'
import UserBox from '../UserBox/UserBox'
import './Contacts.css'

function Contacts({contacts, setContacts }) {
  const user = getTokenAndDecode();

  return (
    <div className='contacts-container'>
        <h4 className='contacts-header'>Contacts</h4>
        <div className='contacts-inputContainer'>
            <input type='text' placeholder='search contacts' className='contacts-input'/>
        </div>
        <div className='contacts-boxContainer'>
          {contacts.length ? contacts.map((c, index) => {
              return (
                <UserBox key={index} contactId={c.members.find((m) => m !== user.id)} conversationId={c._id} setContacts={setContacts} recent={false} />
              )
            }) : <p>You have no contacts</p>}
        </div>
        <div className='contacts-addContactsContainer'>
            <p className='contacts-addContacts'>add contacts +</p>
        </div>
    </div>
  )
}

export default Contacts