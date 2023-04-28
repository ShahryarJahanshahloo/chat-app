import { useState, useEffect } from 'react'
import { socket } from './lib/socket'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.connect()
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.disconnect()
    }
  }, [])

  function clickHandler() {
    socket.emit('chat_msg', message)
  }

  function onChangeHandler(e) {
    setMessage(e.target.value)
  }

  return (
    <div>
      <input onChange={onChangeHandler} value={message}></input>
      <button onClick={clickHandler}>submit</button>
    </div>
  )
}

export default App
