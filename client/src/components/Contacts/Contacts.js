import { useState, useEffect } from 'react'
import { getTokenAndDecode } from '../../utils/auth'
import { userRequest } from '../../utils/apiCalls';
import { IoSearchSharp, IoCloseOutline } from 'react-icons/io5'
import UserBox from '../UserBox/UserBox'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import './Contacts.css'

function Contacts({ contacts, setLoggedIn, openChat, removeContact, addContact }) {
  const user = getTokenAndDecode();
  const [search, setSearch] = useState('')
  const [searchedContacts, setSearchedContacts] = useState(null)

  const clearSearch = () => {
    setSearchedContacts(null)
    setSearch('')
  }
  
  const submitSearch = () => {
   const filterdList = contacts.filter((c) => c.memberNames[0].includes(search) || c.memberNames[1].includes(search))
    setSearchedContacts(filterdList ? filterdList : 'No contact with that username found') 
  }


  const addNewContact = async (c) => {
    let bodyToSend = { members: [user?.id, c._id], memberNames: [user?.username, c.username] }
    const response = await userRequest(`/api/conversation`, 'POST', JSON.stringify(bodyToSend)) 
      if(response.ok) {
        const json =  await response.json();
        addContact(json)
      } else {
        if(response.status === 403) { 
          setLoggedIn(false)
        }
        const json = await response.json();
        console.log('error', json)
        return
      }
  }

  const findNewContact = async (username) => {
    const response = await userRequest(`/api/find/username/${username}`, 'GET', null) 
    try {
      if(response.ok) {
        const json =  await response.json();
        addNewContact(json)
        return
      } else {
        popupReport();
        return
      }
    } catch (err) {
      return popupReport();
    }
  } 

  const popupReport = () => {
    Report.failure(
      'User Not Found',
      'No user with that username found',
      'Okay',
      );
  }

  const popupPrompt = () => {
    Confirm.prompt(
      'Add Contact',
      'Enter Username',
      null,
      'Cancel',
      'Submit',
      () => {
      return
      },
      (clientAnswer) => {
        findNewContact(clientAnswer)
      },
      {
        titleColor:	'#1fa797',
        okButtonBackground: '#a8a8a8',
        cancelButtonBackground: '#1fa797'
      },
    );
  }

  return (
    <div className='contacts-container'>
        <h4 className='contacts-header'>Contacts</h4>
        <div className='contacts-inputContainer'>
            <input type='text' placeholder={search ? search : 'search contacts'} value={search} onChange={(e) => {setSearch(e.target.value)}} className='contacts-input'/>
            { search && <IoCloseOutline className='contacts-clearSearchBtn' onClick={clearSearch}/> }
            <IoSearchSharp className='contacts-searchBtn' onClick={submitSearch}/>
        </div>
        <div className='contacts-boxContainer'>
          {searchedContacts === null ? contacts.length ? contacts.map((c, index) => {
              return (
                <div onClick={() => {openChat(c)}}>
                  <UserBox key={index} contactId={c.members.find((m) => m !== user?.id)} conversationId={c._id} removeContact={removeContact} recent={false} />
                </div>
              )
            }) : <p className='contacts-p'>You have no contacts.</p> : searchedContacts.length ? searchedContacts.map((c, index) => {
              return (
                <div  onClick={() => {openChat(c)}}>
                  <UserBox key={index} contactId={c.members.find((m) => m !== user?.id)} conversationId={c._id} removeContact={removeContact} recent={false} />
                </div>
              )
            }) : <p className='contacts-p'>No contact with that username found.</p> }
        </div>
        <div className='contacts-addContactsContainer'>
            <p className='contacts-addContacts' onClick={popupPrompt}>add contacts +</p>
        </div>
    </div>
  )
}

export default Contacts