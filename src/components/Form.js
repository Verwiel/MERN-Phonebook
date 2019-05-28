import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

export default () => {
  const [ogState, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    url:''
  })
  const [toHome, setToHome] = useState(false)

  const handleChange = e => {
    setState({
      ...ogState,
      [e.target.name]: e.target.value
    })
  }
  

  const handleSubmit= async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'firstName':ogState.firstName,
        'lastName':ogState.lastName,
        'email':ogState.email,
        'phone':ogState.phone,
        'url': ogState.url
      })
    })
    await setToHome(true)
  }

  return (
    <div class='centerthis'>
      <h1>Add User</h1>
      {toHome ? <Redirect to='/'/>:null}
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name" 
            value={ogState.firstName}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name" 
            value={ogState.lastName}
            onChange={handleChange} 
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={ogState.email}
            onChange={handleChange} 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="phone"
            placeholder="Phone Number" 
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            value={ogState.phone}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <input 
            type="url" 
            name="url"
            placeholder="Picture URL" 
            value={ogState.url}
            onChange={handleChange} 
          />
        </div>
        <div>
          <input
            type="submit"
          />
        </div>
      </form>
      
      <a href="/">Home</a>
    </div>
  )
}
