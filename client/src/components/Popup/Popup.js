import React from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { userRequest } from '../../utils/apiCalls';
import './Popup.css'

function Popup({ closePopup, targetMessage, removeMessage, message }) {
  const ref = useDetectClickOutside({ onTriggered: closePopup}); 
  
  const onClickEdit = () => {
    targetMessage(message._id, message.text);
    closePopup();
  }

  const onClickDelete = async () => {
    try {
        const response = await userRequest(`/api/message/${message._id}`, 'DELETE') 
        if(response.ok) {
          removeMessage(message._id);
        } 
      } catch (err) {
        console.log(err)
      }
    closePopup();
  }

  return (
    <div className={'popup-container'} ref={ref}>
        <ul className='popup-list'>
            <li className='popup-listItem' onClick={onClickEdit}>
                <p className='popup-listOption'>edit</p>
            </li>
            <li className='popup-listItem' onClick={onClickDelete}>
                <p className='popup-listOption'>delete</p>
            </li>
        </ul>
    </div>
  )
}

export default Popup