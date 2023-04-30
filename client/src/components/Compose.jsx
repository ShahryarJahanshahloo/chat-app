import { useState } from 'react'
import { socket } from '../lib/socket'
import s from './Compose.module.css'
import { BsFillSendFill as SendButton } from 'react-icons/bs'

const Compose = () => {
  const [message, setMessage] = useState('')

  function clickHandler() {
    socket.emit('chat_msg', message)
  }

  function onChangeHandler(e) {
    setMessage(e.target.value)
  }

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <input
          className={s.input}
          onChange={onChangeHandler}
          value={message}
          placeholder='Type a message'
        ></input>
        <div className={s.send} onClick={clickHandler}>
          <SendButton style={{ color: 'white', fontSize: '20px' }} />
        </div>
      </div>
    </div>
  )
}

export default Compose
