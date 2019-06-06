import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

export default () => {
  const [formState, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    url:''
  })
  const [toHome, setToHome] = useState(false)

  const handleChange = e => {
    setState({
      ...formState,
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
        'firstName':formState.firstName,
        'lastName':formState.lastName,
        'email':formState.email,
        'phone':formState.phone,
        'url': formState.url
      })
    })
    await setToHome(true)
  }

  return (
    <div class='centerthis'>
      <h1 className='white'>Add User</h1>
      {toHome ? <Redirect to='/'/>:null}
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name" 
            value={formState.firstName}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name" 
            value={formState.lastName}
            onChange={handleChange} 
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formState.email}
            onChange={handleChange} 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="phone"
            placeholder="Phone Number" 
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            value={formState.phone}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <input 
            type="url" 
            name="url"
            placeholder="Picture URL" 
            value={formState.url}
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
