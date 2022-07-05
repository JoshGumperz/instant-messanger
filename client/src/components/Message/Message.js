import { useState, useEffect } from 'react'
import { format } from 'timeago.js'
import Popup from '../Popup/Popup'
import './Message.css'


function Message({ message, owner, targetMessage, removeMessage, toggleEdit}) {
  const [openPopup, setOpenPopup] = useState(false)
  const [count, setCount] = useState(0)

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
      { openPopup && <Popup closePopup={togglePopup} targetMessage={targetMessage} toggleEdit={toggleEdit} removeMessage={removeMessage} message={message} owner={owner}/> }
        <div className={message.edited ? 'message-textWrapperEdited' : 'message-textWrapper'} onClick={() => { owner && setOpenPopup(true) }}>
          { message.edited && owner && <p className='message-edited'>(edited)</p> }
          <div className={`message-bubble ${owner ? 'message-sent' : 'message-recieved'} ${message.edited && 'editedBubble'}`}>{message.text}</div>  
          { message.edited && !owner && <p className='message-edited'>(edited)</p> }
        </div>
        <p className='message-date'>{format(message.createdAt)}</p>
    </div>
  )
}

export default Message