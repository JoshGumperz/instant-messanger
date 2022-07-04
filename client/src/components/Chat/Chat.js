import React, { useEffect, useState, useRef } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { userRequest } from '../../utils/apiCalls'
import { getTokenAndDecode } from '../../utils/auth'
import Message from '../Message/Message'
import './Chat.css'

function Chat({conversation}) {
  const user = getTokenAndDecode();
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const getMessages = async () => {
    try {
      const response = await userRequest(`/api/message/${conversation._id}`, 'GET', null) 
      if(response.ok) {
        const json = await response.json()
        setMessages(json)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect (() => {
    conversation && getMessages();
  }, [conversation])

  const sendMessage = async () => {
    try {
      let bodyToSend = { senderId: user.id, text: newMessage, conversationId: conversation._id }
      const response = await userRequest(`/api/message`, 'POST', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        const json =  await response.json();
        setMessages([...messages, json])
      } 
    } catch (err) {
      console.log(err)
    }
  }

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      return sendMessage();
    }
  }

  return (
    <div className='chat-container'>
        <div className='chat-messagesContainer'>
          { messages.length ? messages.map((m, index) => {
            return (
              <div className={m.senderId === user.id ? 'chat-messageWrapperOwn' : 'chat-messageWrapper'}>
                <Message message={m} owner={m.senderId === user.id}/>
              </div>
            )
          }) : <p className='chat-p'>There are no messages in this conversation yet.</p>}
        </div>
        <div className='chat-formContainer'>
            <form className='chat-form'>
                <textarea className='chat-input' placeholder='send a message...' value={newMessage} onChange={(e) => {setNewMessage(e.target.value)}} onKeyDown={onEnterPress}></textarea>
                <IoSendSharp className='chat-btn' onClick={sendMessage}/>
            </form>
        </div>
    </div>
  )
}

export default Chat