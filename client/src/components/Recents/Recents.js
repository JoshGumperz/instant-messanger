import React from 'react'
import UserBox from '../UserBox/UserBox'
import './Recents.css'

function Recents() {
  return (
    <div className='recents-container'>
        <h4 className='recents-header'>Recent Conversations</h4>
        <div className='recents-boxContainer'>
            <UserBox conversation={{name: "Josh", lastMessage: "How are you?"}}/>
            <UserBox conversation={{name: "Daniel", lastMessage: "What's up?"}}/>
            <UserBox conversation={{name: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", lastMessage: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"}}/>
        </div>
    </div>
  )
}

export default Recents