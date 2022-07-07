import React, { useEffect, useState, useRef } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { userRequest } from '../../utils/apiCalls'
import { getTokenAndDecode } from '../../utils/auth'
import Message from '../Message/Message'
import './Chat.css'

function Chat({ conversation, sendMessageToSocket, editMessageInSocket, deleteMessageInSocket, modifyMessage, arrivalMessage, updateLastMessageSent }) {
  const user = getTokenAndDecode();
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [targettedMessage, setTargettedMessage] = useState(null)
  const scrollRef = useRef();
  const receiverId = conversation.members.find(member => member !== user.id);


  useEffect(() => {
    arrivalMessage && conversation.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, conversation])

  useEffect(() => {
    if(modifyMessage && conversation.members.includes(modifyMessage.sender)) {
      if(modifyMessage.text) {
        updateMessagesArr(modifyMessage)
      } else {
        setMessages(messages.filter((m) => m._id !== modifyMessage.id))
      }
    }
  }, [modifyMessage, conversation])

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

  const updateMessagesArr = (message) => {

    const updatedMessages = messages.map(obj => {
      if (obj._id === message.id) {
        return {...obj, text: message.text, edited: true};
      }
      return obj;
    });
    setMessages(updatedMessages)
  } 

  const sendMessage = async () => {
    try {
      let bodyToSend = { senderId: user.id, text: newMessage, conversationId: conversation._id }
      const response = await userRequest(`/api/message`, 'POST', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        const json =  await response.json();
        sendMessageToSocket(user.id, receiverId, json._id, conversation._id, newMessage);
        setMessages([...messages, json])
        setNewMessage('')
        updateLastMessageSent({conversationId: conversation._id, text: newMessage})
      } 
    } catch (err) {
      console.log(err)
    }
  }

  const editMessage = async () => {
    editMessageInSocket(user.id, receiverId, targettedMessage.id, targettedMessage.text)
    try {
      let bodyToSend = { text: targettedMessage.text, edited: true }
      const response = await userRequest(`/api/message/${targettedMessage.id}`, 'PUT', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        updateMessagesArr(targettedMessage);
        setTargettedMessage(null);
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
                <Message message={m} owner={m.senderId === user.id} deleteMessageInSocket={deleteMessageInSocket} targetMessage={targetMessage} removeMessage={removeMessage} receiverId={receiverId}/>
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