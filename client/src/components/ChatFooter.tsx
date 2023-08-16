import { useRef, useState, FC, ChangeEvent, KeyboardEvent } from 'react'
import { socket } from '../lib/socket'
import s from './ChatFooter.module.css'
import { RiSendPlane2Fill as SendButton } from 'react-icons/ri'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'

const ChatFooter: FC = () => {
  const [message, setMessage] = useState<string>('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const conversation = useSelectedConversationStore(state => state.conversation)

  useAutosizeTextArea(inputRef.current, message)

  function clickHandler() {
    if (!conversation) return
    socket.emit('MSG_FROM_CLIENT', {
      text: message,
      conversationId: conversation.id,
      createdAt: new Date(),
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
              id='main-message-input'
              onChange={onChangeHandler}
              rows={1}
              value={message}
              placeholder='Type your message'
              ref={inputRef}
              onKeyDown={keyDownHandler}
            />
          </div>
          <div className={s.send} onClick={clickHandler}>
            <SendButton
              style={{
                color: message ? 'var(--color-primary-1)' : 'var(--color-icon)',
                fontSize: '24px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatFooter
