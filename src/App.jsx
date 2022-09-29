import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')

  console.log(message)

  function displaySleep(data) {
    setMessage(`${data[0].child.name} slept from ${data[0].start_time.slice(0, -3)} to ${data[0].end_time.slice(0, -3)} for a total of ${data[0].duration / 1000 / 60} minutes`)
  }


  useEffect(() => {
    axios.get('http://localhost:4000/sleeps/2')
    .then(res => {
      console.log(res.data)
      displaySleep(res.data)
    })
  }, [])

  return (
    <div className="app">
      <p>{message}</p>
    </div>
  );
}

export default App;
