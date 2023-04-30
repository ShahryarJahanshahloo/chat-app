import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import Message from './Message'

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
    <div>
      {messages &&
        messages.map((value, index) => (
          <div key={index}>
            <Message value={value} />
          </div>
        ))}
    </div>
  )
}

export default MessagesList
