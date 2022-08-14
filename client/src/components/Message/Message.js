import { useState, useEffect } from 'react'
import Popup from '../Popup/Popup'
import './Message.css'


function Message({ message, owner, targetMessage, deleteMessageInSocket, removeMessage,receiverId }) {
  const [openPopup, setOpenPopup] = useState(false)
  const [count, setCount] = useState(0)

  function timeSince(utcDate) {
    let currentDate = new Date()
    let localDate = new Date(utcDate);

    var seconds = Math.floor((currentDate - localDate) / 1000);

    let interval = seconds / 3456000;
    if (interval > 1) {
      return localDate.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      const amount = Math.floor(interval)
      return amount + " month ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      const amount = Math.floor(interval)
      return amount > 1 ? amount + " days ago" : amount + " day ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      const amount = Math.floor(interval)
      return amount > 1 ? amount + " hours ago" : amount + " hour ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      const amount = Math.floor(interval)
      return amount > 1 ? amount + " minutes ago" : amount + " minute ago";
    }
    return "just now"
  }

  const togglePopup = () => {
    if (count >= 1) {
      setOpenPopup(false)
    }
    setCount(count + 1)
  }

  useEffect(() => {
    if (!openPopup) {
      setCount(0)
    }
  }, [openPopup])

  return (
    <div className={`message-container ${owner && 'message-own'}`}>
      { openPopup && <Popup closePopup={togglePopup} targetMessage={targetMessage} deleteMessageInSocket={deleteMessageInSocket} removeMessage={removeMessage} message={message} receiverId={receiverId}/> }
        <div className={message.edited ? 'message-textWrapperEdited' : 'message-textWrapper'} onClick={() => { owner && setOpenPopup(true) }}>
          { message.edited && owner && <p className='message-edited'>(edited)</p> }
          <div className={`message-bubble ${owner ? 'message-sent' : 'message-recieved'} ${message.edited && 'editedBubble'}`}>{message.text}</div>  
          { message.edited && !owner && <p className='message-edited'>(edited)</p> }
        </div>
        <div className='message-date'>{timeSince(message.createdAt)}</div>
    </div>
  )
}

export default Message