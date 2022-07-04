import React, { useEffect, useState } from 'react'
import { userRequest } from '../../utils/apiCalls'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import './UserBox.css'

function UserBox({ contactId, conversationId, removeContact, recent}) {
  const [contact, setContact] = useState(null)
  const [message, setMessage] = useState(null)


  async function getContact() {
    const response = await userRequest(`/api/user/find/${contactId}`, 'GET', null) 
    if(response.ok) {
      const json =  await response.json();
      setContact(json)
      return
    } else {
      const json = await response.json();
      console.log('error', json)
      return
    }
  }

  async function getLastMessage() {
    const response = await userRequest(`api/message/find/${conversationId}`, 'GET', null) 
    if(response.ok) {
      const json = await response.json();
      json[0] && setMessage(json[0].text)
      return
    } else {
      const json = await response.json();
      console.log('error', json)
      return
    }
  }

  async function deleteContact() {
    const response = await userRequest(`api/conversation/${conversationId}`, 'DELETE', null) 
    if(response.ok) {
      const json = await response.json();
      removeContact(conversationId);
      console.log('success', json)
      return
    } else {
      const json = await response.json();
      console.log('error', json)
      return
    }
  }

  function popup() {
    Confirm.show(
      'Confirm',
      'Are you sure you want to remove this contact?',
      'Cancel',
      'Yes',
      () => {
        return
      },
      () => {
        deleteContact();
      },
      {
        titleColor:	'#1fa797',
        okButtonBackground: '#a8a8a8',
        cancelButtonBackground: '#1fa797'

      },
    );
  }

  useEffect(() => {
    contactId && getContact();
    if (recent) {
      conversationId && getLastMessage();
    }
  }, [contactId, conversationId])

  return (
    <div className={`userbox-container ${ recent ?  'userbox-recent' : 'userbox-contact'}`}>
        <div className='userbox-name userbox-text'>{contact && contact.username}</div>
        {recent && 
        <div className='userbox-lastMessage userbox-text'>{message && message}</div> 
        }
        {!recent && 
        <div className='userbox-removeBtnContainer'>
          <p className='userbox-removeBtn' onClick={popup}>remove</p>
        </div>
        }
    </div>
  )
}

export default UserBox