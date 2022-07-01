import React from 'react'
import { IoSendSharp } from 'react-icons/io5'
import Message from '../Message/Message'
import './Chat.css'

function Chat() {
  return (
    <div className='chat-container'>
        <div className='chat-messagesContainer'>
          <Message message={{text: "How are you?", createdAt: "1 hour ago"}} owner={false}/>
          <Message message={{text: "I'm doing well", createdAt: "30 minutes ago"}} owner={true}/>
          <Message message={{text: "Hi", createdAt: "now"}} owner={false}/>
          <Message message={{text: "a", createdAt: "now"}} owner={false}/>
          <Message message={{text: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdAt: "now"}} owner={true}/>
          <Message message={{text: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdAt: "now"}} owner={false}/>
          <Message message={{text: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdAt: "now"}} owner={true}/>
          <Message message={{text: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdAt: "now"}} owner={false}/>
          <Message message={{text: "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdAt: "now"}} owner={true}/>
        </div>
        <div className='chat-formContainer'>
            <form className='chat-form'>
                <textarea className='chat-input' placeholder='send a message...'></textarea>
                <IoSendSharp className='chat-btn'/>
            </form>
        </div>
    </div>
  )
}

export default Chat