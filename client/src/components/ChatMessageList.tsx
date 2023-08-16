import { FC, useEffect } from 'react'
import { socket, ServerMessage } from '../lib/socket'
import ChatMessage from './ChatMessage'
import s from './ChatMessageList.module.css'
import useNewMessagesStore from '../store/useNewMessagesStore'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useOldMessagesStore from '../store/useOldMessgesStore'
import ChatAlter from './ChatAlter'
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
      {selectedConversation &&
      (oldMessages[selectedConversation.id].length > 0 ||
        newMessages[selectedConversation.id].length > 0) ? (
        <div className={s.inner}>
          {oldMessages[selectedConversation.id].map((value, index) => (
            <ChatMessage message={value} key={index} />
          ))}
          {newMessages[selectedConversation.id].map((value, index) => (
            <ChatMessage message={value} key={index} />
          ))}
        </div>
      ) : (
        <ChatAlter />
      )}
    </div>
  )
}

export default ChatMessageList
