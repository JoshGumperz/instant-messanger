import { useState, useEffect, useRef   } from 'react'
import { getTokenAndDecode } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls'
import { io } from "socket.io-client"
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import Recents from '../../components/Recents/Recents'
import './Home.css'

function Home() {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messageSent, setMessageSent] = useState(0)
  const socket = useRef(io('ws://localhost:8000'))
  const user = getTokenAndDecode();

  useEffect(() => {
    socket.current.emit('userConnect', user.id);
    socket.current.on('getUsers', users=>{
      console.log("users from socket server:", users)
    })
  }, [user])

  const incrementMessageSent = () => {
    setMessageSent(messageSent + 1)
  }

  const openChat = (chat) => {
    setCurrentChat(chat)
  }
  
  useEffect(() => {
    async function getConversations() {
      const response = await userRequest(`/api/conversation/${user.id}`, 'GET', null)
      if(response.ok) {
        const json = await response.json()
        setConversations(json)
      } else {
        const json = await response.json()
        console.log('error', json)
      }
    }

    getConversations();
  }, [])

  const removeConversation = (id) =>  {
    setConversations(conversations.filter((c) => c._id !== id))
  }

  const addConversation = (conversation) => {
    setConversations([...conversations, conversation])
  }

  return (
    <div className='home-container'>
      <div className='home-box'>
        <div className='home-wrapper home-recents-container'>
          <Recents recents={conversations} openChat={openChat} messageSent={messageSent}/>
        </div>
        <div className='home-wrapper home-main-container'>
          { currentChat ? 
            <Chat conversation={currentChat} incrementMessageSent={incrementMessageSent}/>
            : <p className='home-p'>Open a conversation to start a chat.</p> 
          }
        </div>
        <div className='home-wrapper home-contacts-container'>
          <Contacts contacts={conversations} openChat={openChat} removeContact={removeConversation} addContact={addConversation}/>
        </div>
      </div>
    </div>
  )
}

export default Home