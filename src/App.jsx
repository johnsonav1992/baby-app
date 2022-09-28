import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [error, setError] = useState('')

  useEffect(() => {
    axios.post('http://localhost:4000/login', {username: "testuser",
    password: "testpass"})
    .then(res => {
      console.log(res.data)
    })
    .catch(err => setError(err.response.data.errorMessage))
  })

  return (
    <div className="App">
      <p>{error && error}</p>
    </div>
  );
}

export default App;
