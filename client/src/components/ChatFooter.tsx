import { useRef, useState, FC, ChangeEvent, KeyboardEvent } from 'react'
import { socket } from '../lib/socket'
import s from './ChatFooter.module.css'
import { BsFillSendFill as SendButton } from 'react-icons/bs'
import useSelectedConversationStore from '../store/useSelectedConversationStore'

const ChatFooter: FC = () => {
  const [message, setMessage] = useState<string>('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const conversation = useSelectedConversationStore(state => state.conversation)

  function clickHandler() {
    if (!conversation) return
    socket.emit('MSG_FROM_CLIENT', {
      text: message,
      conversationId: conversation.id,
      createdAt: `${Date.now()}`,
    })
    setMessage('')
    inputRef.current?.focus()
  }

  function onChangeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value)
  }

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 && e.ctrlKey) clickHandler()
  }

  return (
    <div className={s.container}>
      {conversation && (
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

export default ChatFooter
