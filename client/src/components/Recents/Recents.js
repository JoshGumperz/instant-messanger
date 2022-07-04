import { useState, useEffect } from 'react'
import { userRequest } from '../../utils/apiCalls'
import { getTokenAndDecode } from '../../utils/auth'
import UserBox from '../UserBox/UserBox'
import './Recents.css'

function Recents({ recents }) {
  const user = getTokenAndDecode();

  return (
    <div className='recents-container'>
        <h4 className='recents-header'>Recent Conversations</h4>
        <div className='recents-boxContainer'>
          {recents.length ? recents.map((c, index) => {
            return (
              <UserBox key={index} contactId={c.members.find((m) => m !== user.id)} conversationId={c._id} recent={true}/>
            )
          }) : <p>You have no recent recents</p>}
        </div>
    </div>
  )
}

export default Recents