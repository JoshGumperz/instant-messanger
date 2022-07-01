import React from 'react'
import './UserBox.css'

function UserBox({conversation}) {
  return (
    <div className='userbox-container'>
        <div className='userbox-name userbox-text'>{conversation.name}</div>
        {conversation.lastMessage && <div className='userbox-lastMessage userbox-text'>{conversation.lastMessage}</div> }
    </div>
  )
}

export default UserBox