import React, { useEffect, useState, useRef } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { userRequest } from '../../utils/apiCalls'
import { getTokenAndDecode } from '../../utils/auth'
import Message from '../Message/Message'
import './Chat.css'

function Chat({conversation, incrementMessageSent}) {
  const user = getTokenAndDecode();
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [targettedMessage, setTargettedMessage] = useState(null)
  const scrollRef = useRef();

  const removeMessage =  (id) => {
    setMessages(messages.filter((m) => m._id !== id))
  }

  const targetMessage = (messageId, messageText) => {
    setTargettedMessage({id: messageId, text: messageText})
  }

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [messages])

  const sendMessage = async () => {
    try {
      let bodyToSend = { senderId: user.id, text: newMessage, conversationId: conversation._id }
      const response = await userRequest(`/api/message`, 'POST', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        const json =  await response.json();
        setMessages([...messages, json])
        setNewMessage('')
        incrementMessageSent();
      } 
    } catch (err) {
      console.log(err)
    }
  }

  const editMessage = async () => {
    try {
      let bodyToSend = { text: targettedMessage.text, edited: true }
      const response = await userRequest(`/api/message/${targettedMessage.id}`, 'PUT', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        const updatedMessages = messages.map(obj => {
          if (obj._id === targettedMessage.id) {
            return {...obj, text: targettedMessage.text, edited: true};
          }
          return obj;
        });
        setMessages(updatedMessages)
        setTargettedMessage(null)
      } 
    } catch (err) {
      console.log(err)
    }
  }

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      return targettedMessage ? editMessage() : sendMessage();
    }
  }

  const onChangeNewMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const onChangeEditMessage = (e) => {
    setTargettedMessage({...targettedMessage, text: e.target.value})
  }

  return (
    <div className='chat-container'>
        <div className='chat-messagesContainer'>
          { messages.length ? messages.map((m, index) => {
            return (
              <div className={m.senderId === user.id ? 'chat-messageWrapperOwn' : 'chat-messageWrapper'} ref={scrollRef}>
                <Message message={m} owner={m.senderId === user.id} targetMessage={targetMessage} removeMessage={removeMessage}/>
              </div>
            )
          }) : <p className='chat-p'>There are no messages in this conversation yet.</p>}
        </div>
        <div className='chat-formContainer'>
            <form className='chat-form'>
                <textarea className='chat-input' placeholder='send a message...' value={targettedMessage ? targettedMessage.text : newMessage} onChange={targettedMessage ? onChangeEditMessage : onChangeNewMessage} onKeyDown={onEnterPress}></textarea>
                <IoSendSharp className='chat-btn' onClick={ targettedMessage ? editMessage : sendMessage}/>
            </form>
        </div>
    </div>
  )
}

export default Chat