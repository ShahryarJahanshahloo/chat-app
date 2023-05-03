import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import Message from './Message'
import s from './MessagesList.module.css'
import { events } from '../lib/socket'

const MessagesList = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function onNewMessage(msg) {
      setMessages(prevState => [...prevState, msg])
    }

    socket.on(events.MSG_RECIEVED, onNewMessage)

    return () => {
      socket.off(events.MSG_RECIEVED)
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.inner}>
        {messages &&
          messages.map((value, index) => (
            <div key={index}>
              <Message value={value} sent={true} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default MessagesList
