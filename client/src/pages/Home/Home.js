import { useState, useEffect, useRef } from 'react'
import { getTokenAndDecode } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls'
import { io } from "socket.io-client"
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import Recents from '../../components/Recents/Recents'
import './Home.css'
const socket = io.connect('http://localhost:8000')


function Home() {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [modifyMessage, setModifyMessage] = useState(null)
  const [lastMessageSent, setLastMessageSent] = useState(null)
  const user = getTokenAndDecode();


  const clearArrivalMessage = () => {
    setArrivalMessage(null)
  }

  const updateLastMessageSent = (message) => {
    setLastMessageSent(message)
  }

  useEffect(() => {
    socket.emit('userConnect', user.id);
    socket.on('getUsers', users=>{
      console.log("users from socket server:", users)
    })
    socket.on("userDisconnected", users=> {
      console.log('user disconnected:', users)
    })
  }, [user])

  useEffect(() => {
    socket.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        _id: data.messageId,
        conversationId: data.conversationId,
        createdAt: Date.now()
      })
    })

    socket.on("messageEdited", data => {
      setModifyMessage({
        sender: data.senderId,
        id: data.messageId,
        text: data.text
      })
    })

    socket.on("messageDeleted", data => {
      setModifyMessage({
        sender: data.senderId,
        id: data.messageId,
      })
    })
  }, [])

  const sendMessageToSocket = (senderId, receiverId, messageId, conversationId, text) => {
    const messageObj = { 
      senderId, receiverId, messageId, conversationId, text 
    };
    socket.emit("sendMessage", messageObj);
  };

  const editMessageInSocket = (senderId, receiverId, messageId, text) => {
    const messageObj = { 
      senderId, receiverId, messageId, text 
    };
    socket.emit("editMessage", messageObj);
  };

  const deleteMessageInSocket = (senderId, receiverId, messageId) => {
    const messageObj = { 
      senderId, receiverId, messageId
    };
    socket.emit("deleteMessage", messageObj);
  };

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
          <Recents recents={conversations} openChat={openChat} arrivalMessage={arrivalMessage} lastMessageSent={lastMessageSent}/>
        </div>
        <div className='home-wrapper home-main-container'>
          { currentChat ? 
            <Chat conversation={currentChat} sendMessageToSocket={sendMessageToSocket} editMessageInSocket={editMessageInSocket} deleteMessageInSocket={deleteMessageInSocket} arrivalMessage={arrivalMessage} modifyMessage={modifyMessage} updateLastMessageSent={updateLastMessageSent}/>
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