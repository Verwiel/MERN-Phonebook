import React, { useState, useEffect } from 'react'
import User from './Users'
import axios from 'axios'

export default () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then(result => setData(result.data))
  }, [])

  return (
    <div className="App">
      <h1>Contacts</h1>
      <div>
        {data.map((user, index) => (
            <User class='col' key={user._id} index={index} user={user} />
        ))}
      </div>
      <div class='centerthis'>
        <a  href="/user">Add</a>
      </div>
    </div>
  )
}
