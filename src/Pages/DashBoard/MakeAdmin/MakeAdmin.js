import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const MakeAdmin = () => {
  const [email, setEmail] = useState('')
  const user = { email }
  const handleBlur = e => {
    setEmail(e.target.value)
  }
  const handleSubmit = e => {
    fetch('http://localhost:5000/users/admin', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => console.log(data))
    e.preventDefault()
  }
  return (
    <div>
      <h1>Make Admin</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type='email'
          name='email'
          label='Email'
          onBlur={handleBlur}
          variant='standard'
        />
        <br />
        <Button type='submit'>Add Admin</Button>
      </form>
    </div>
  )
}

export default MakeAdmin
