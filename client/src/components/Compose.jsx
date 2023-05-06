import { useRef, useState } from 'react'
import { socket } from '../lib/socket'
import s from './Compose.module.css'
import { BsFillSendFill as SendButton } from 'react-icons/bs'
import { events } from '../lib/socket'
import useSelectedConversationStore from '../hooks/useSelectedConversationStore'

const Compose = () => {
  const [message, setMessage] = useState('')
  const inputRef = useRef()
  const conversation = useSelectedConversationStore(state => state.conversation)

  function clickHandler() {
    socket.emit(events.MSG_FROM_CLIENT, {
      text: message,
      conversationId: conversation.id,
      createdAt: Date.now(),
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
      {conversation == null ? null : (
        <div className={s.inner}>
          <div className={s.compose}>
            <textarea
              className={s.input}
              onChange={onChangeHandler}
              value={message}
              placeholder='Type your message...'
              ref={inputRef}
              onKeyDown={keyDownHandler}
            />
          </div>
          <div className={s.send} onClick={clickHandler}>
            <SendButton style={{ color: 'white', fontSize: '20px' }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Compose
