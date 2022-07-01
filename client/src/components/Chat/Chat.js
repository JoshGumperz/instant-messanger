import React from 'react'
import { IoSendSharp } from 'react-icons/io5'
import './Chat.css'

function Chat() {
  return (
    <div className='chat-container'>
        <div className='chat-messagesContainer'>
            <div>Message</div>
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