import { useRef, useState } from 'react'
import { socket } from '../lib/socket'
import s from './Compose.module.css'
import { BsFillSendFill as SendButton } from 'react-icons/bs'

const Compose = () => {
  const [message, setMessage] = useState('')
  const inputRef = useRef()

  function clickHandler() {
    socket.emit('chat_msg', {
      text: message,
      author: 132,
      date: Date.now(),
    })
    setMessage('')
    inputRef.current.focus()
  }

  function onChangeHandler(e) {
    setMessage(e.target.value)
  }

  function keyDownHandler(e) {
    if (e.keyCode === 13 && e.ctrlKey) clickHandler()
  }

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.compose}>
          <textarea
            className={s.input}
            onChange={onChangeHandler}
            value={message}
            placeholder='Type a message'
            ref={inputRef}
            onKeyDown={keyDownHandler}
          />
        </div>
        <div className={s.send} onClick={clickHandler}>
          <SendButton style={{ color: 'white', fontSize: '20px' }} />
        </div>
      </div>
    </div>
  )
}

export default Compose
