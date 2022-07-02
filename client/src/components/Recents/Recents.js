import React from 'react'
import UserBox from '../UserBox/UserBox'
import './Recents.css'

function Recents() {
  return (
    <div className='recents-container'>
        <h4 className='recents-header'>Recent Conversations</h4>
        <div className='recents-boxContainer'>
            <UserBox conversation={{name: "Mike", lastMessage: "How are you?"}} contact={false}/>
            <UserBox conversation={{name: "Lucas", lastMessage: "What's up?"}} contact={false}/>
            <UserBox conversation={{name: "teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", lastMessage: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest"}} contact={false}/>
        </div>
    </div>
  )
}

export default Recents