import React from 'react'
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import Recents from '../../components/Recents/Recents'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <div className='home-box'>
        <div className='home-wrapper home-recents-container'>
          <Recents/>
        </div>
        <div className='home-wrapper home-main-container'>
          <Chat/>
        </div>
        <div className='home-wrapper home-contacts-container'>
          <Contacts/>
        </div>
      </div>
    </div>
  )
}

export default Home