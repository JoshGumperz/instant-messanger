import React from 'react'
import './Message.css'
import { format } from 'timeago.js'

function Message({message, owner}) {
  return (
    <div className={`message-container ${owner && 'message-own'}`}>
        <div className={message.edited ? 'message-textWrapperEdited' : 'message-textWrapper'}>
          { message.edited && owner && <p className='message-edited'>(edited)</p> }
          <div className={`message-bubble ${owner ? 'message-sent' : 'message-recieved'} ${message.edited && 'editedBubble'}`}>{message.text}</div>  
          { message.edited && !owner && <p className='message-edited'>(edited)</p> }
        </div>
        <p className='message-date'>{format(message.createdAt)}</p>
    </div>
  )
}

export default Message