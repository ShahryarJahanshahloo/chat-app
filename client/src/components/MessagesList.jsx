import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import Message from './Message'
import s from './MessagesList.module.css'

const MessagesList = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function onNewMessage(msg) {
      setMessages(prevState => [...prevState, msg])
    }

    socket.on('new_msg', onNewMessage)

    return () => {
      socket.off('new_msg')
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
