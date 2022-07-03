import React, { useEffect, useState } from 'react'
import { userRequest } from '../../utils/apiCalls'
import './UserBox.css'

function UserBox({ contactId, conversationId }) {
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

  useEffect(() => {
    contactId && getContact();
    conversationId && getLastMessage();
  }, [contactId, conversationId])

  return (
    <div className={`userbox-container ${ conversationId ?  'userbox-recent' : 'userbox-contact'}`}>
        <div className='userbox-name userbox-text'>{contact && contact.username}</div>
        {conversationId && 
        <div className='userbox-lastMessage userbox-text'>{message && message}</div> 
        }
        {!conversationId && 
        <div className='userbox-removeBtnContainer'>
          <p className='userbox-removeBtn'>remove</p>
        </div>}
    </div>
  )
}

export default UserBox