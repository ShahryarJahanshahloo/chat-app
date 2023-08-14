import { FC, useEffect } from 'react'
import { socket, ServerMessage } from '../lib/socket'
import ChatMessage from './ChatMessage'
import s from './ChatMessageList.module.css'
import useNewMessagesStore from '../store/useNewMessagesStore'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useOldMessagesStore from '../store/useOldMessgesStore'
import moment from 'moment'

const ChatMessageList: FC = () => {
  const newMessages = useNewMessagesStore(state => state.messages)
  const addNewMessage = useNewMessagesStore(state => state.addNewMessage)
  const selectedConversation = useSelectedConversationStore(
    state => state.conversation
  )
  const oldMessages = useOldMessagesStore(state => state.messages)

  useEffect(() => {
    socket.on('MSG_FROM_SERVER', function (msg: ServerMessage) {
      const date = moment(msg.createdAt).format('HH:mm')
      msg.createdAt = date
      addNewMessage(msg)
    })
    return () => {
      socket.off('MSG_FROM_SERVER')
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.inner}>
        {selectedConversation &&
          oldMessages[selectedConversation.id].map((value, index) => (
            <ChatMessage message={value} key={index} />
          ))}
        {selectedConversation &&
          newMessages[selectedConversation.id].map((value, index) => (
            <ChatMessage message={value} key={index} />
          ))}
      </div>
    </div>
  )
}

export default ChatMessageList
