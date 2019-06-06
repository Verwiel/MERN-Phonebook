import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default (props) => {
  const [toHome, setToHome] = useState(false)
  const [editState, setEdit] = useState(false)
  const [data, setData] = useState([])
  const [initialState, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const singleUserId = props.match.params.id


  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/user/${singleUserId}`)
      .then(result => setData([result.data]))
  }, [])

  const handleChange = e => {
    setState({
      ...initialState,
      [e.target.name]: e.target.value
    })
  }

  // handle update is broke
  const handleUpdate= async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:5000/user/${singleUserId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'firstName':initialState.firstName,
        'lastName':initialState.lastName,
        'email':initialState.email,
        'phone':initialState.phone    
      })
    })
    await setToHome(true)
  }

  const handleDelete= async (e) => {
    e.preventDefault()
    await fetch (`http://localhost:5000/user/${singleUserId}`, {
      method: "DELETE"
    })
    await setToHome(true)
  }

  const initials = data.map((user, index) => (
    user.firstName.charAt(0) + user.lastName.charAt(0)
  ))

  return (
    <>
      <section class='centerthis'>
        {data.map((user, index) => (
          <span  class="tc">
            {' '}
            {user.url
              ? <img class="br-100 h4 w4 dib ba b--black-05 pa2" src={user.url} alt='user avatar'/>
              : initials}{' '}
          </span>
        ))}
      

      {!editState && (
      <div>
        {data.map((user, index) => (
          <section>
            <div key={user._id} index={index} user={user}>
              <div></div>
              <div class="f3 mb2">{user.firstName} {user.lastName}</div>
              <div class="f5 fw4 gray mt0">{user.phone}</div>
              <div class="f5 fw4 gray mt0">{user.email}</div>            
            </div>

            <input type='button' value='Edit' onClick={() => setEdit(true)}  />
            <div class='centerthis'>
              <a href="/">Home</a>
            </div>
          </section>
        ))} 
      </div>
      )}
   </section>   
      {toHome ? <Redirect to='/'/>:null}
      {editState && (
        <>
        {data.map((user, index) => (
          <div class='centerthis'>
            <form onSubmit={handleUpdate}>
              <div>
                <input 
                  type="text" 
                  name='firstName'
                  placeholder={user.firstName}
                  value={initialState.firstName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder={user.lastName}
                  value={initialState.lastName}
                  onChange={handleChange} 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder={user.email}
                  value={initialState.email}
                  onChange={handleChange} 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  name="phone"
                  placeholder={user.phone}
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  value={initialState.phone}
                  onChange={handleChange}               
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Update"
                />
              </div>
            </form>

            <form onSubmit={handleDelete}>
              <input type="submit" value="Delete" />
            </form>

            <input type='button' value='Cancel' onClick={() => setEdit(false)} />
          </div>
        ))}      
        </>      
      )}
   
    </>
  )
}
