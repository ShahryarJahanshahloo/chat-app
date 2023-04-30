import { useState } from 'react'
import { socket } from '../lib/socket'

const Compose = () => {
  const [message, setMessage] = useState('')

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

export default Compose
