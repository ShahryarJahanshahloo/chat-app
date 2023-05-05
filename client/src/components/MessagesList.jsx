import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import Message from './Message'
import s from './MessagesList.module.css'
import { events } from '../lib/socket'
import useMessagesStore from '../hooks/useMessagesStore'
import useSelectedConversationStore from '../hooks/useSelectedConversationStore'

const MessagesList = () => {
  const messages = useMessagesStore(state => state.messages)
  const addNewMessage = useMessagesStore(state => state.addNewMessage)
  const selectedConversation = useSelectedConversationStore(
    state => state.conversation
  )

  useEffect(() => {
    function onNewMessage(msg) {
      console.log(messages)
      addNewMessage(msg)
    }

    socket.on(events.MSG_FROM_SERVER, onNewMessage)

    return () => {
      socket.off(events.MSG_FROM_SERVER)
    }
  }, [])

  console.log(selectedConversation, messages)

  return (
    <div className={s.container}>
      <div className={s.inner}>
        {selectedConversation == null || Object.keys(messages).length == 0
          ? null
          : messages[selectedConversation.id].map((value, index) => (
              <div key={index}>
                <Message value={value} sent={true} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default MessagesList
