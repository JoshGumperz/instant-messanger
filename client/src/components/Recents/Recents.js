import { useState, useEffect } from 'react'
import { userRequest } from '../../utils/apiCalls'
import { getTokenAndDecode } from '../../utils/auth'
import UserBox from '../UserBox/UserBox'
import './Recents.css'

function Recents() {
  const [conversations, setConversations] = useState([])
  const user = getTokenAndDecode();
  
  useEffect(() => {
    async function getConversations() {
      const response = await userRequest(`/api/conversation/${user.id}`, 'GET', null)
      if(response.ok) {
        const json = await response.json()
        setConversations(json)
      } else {
        const json = await response.json()
        console.log(json)
      }
    }

    getConversations();
  }, [])

  // console.log(conversations)

  return (
    <div className='recents-container'>
        <h4 className='recents-header'>Recent Conversations</h4>
        <div className='recents-boxContainer'>
          {conversations.length ? conversations.map((c, index) => {
            return (
              <UserBox key={index} contactId={c.members.find((m) => m !== user.id)} conversationId={c._id}/>
            )
          }) : <p>You have no recent conversations</p>}
        </div>
    </div>
  )
}

export default Recents