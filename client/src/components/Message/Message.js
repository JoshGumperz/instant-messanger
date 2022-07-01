import React from 'react'
import './Message.css'

function Message({message, owner}) {
  return (
    <div className={`message-container ${owner && 'message-own'}`}>
        <div className={`message-bubble ${owner ? 'message-sent' : 'message-recieved'}`}>{message.text}</div>
        <p className='message-date'>{message.createdAt}</p>
    </div>
  )
}

export default Message