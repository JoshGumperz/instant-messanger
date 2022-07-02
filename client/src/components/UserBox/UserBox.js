import React from 'react'
import './UserBox.css'

function UserBox({conversation, contact }) {
  return (
    <div className={`userbox-container ${ contact ? 'userbox-contact' : 'userbox-recent'}`}>
        <div className='userbox-name userbox-text'>{conversation.name}</div>
        {!contact && <div className='userbox-lastMessage userbox-text'>{conversation.lastMessage}</div> }
        {contact && 
        <div className='userbox-removeBtnContainer'>
          <p className='userbox-removeBtn'>remove</p>
        </div>}
    </div>
  )
}

export default UserBox