import { FC, useEffect } from 'react'
import { socket } from '../lib/socket'
import Message from './Message'
import s from './MessagesList.module.css'
import useNewMessagesStore from '../hooks/useNewMessagesStore'
import useSelectedConversationStore from '../hooks/useSelectedConversationStore'
import useOldMessagesStore from '../hooks/useOldMessgesStore'
import moment from 'moment'

const MessagesList: FC = () => {
  const newMessages = useNewMessagesStore(state => state.messages)
  const addNewMessage = useNewMessagesStore(state => state.addNewMessage)
  const selectedConversation = useSelectedConversationStore(
    state => state.conversation
  )
  const oldMessages = useOldMessagesStore(state => state.messages)

  useEffect(() => {
    function onNewMessage(msg: any) {
      const date = moment(msg.createdAt).format('HH:mm')
      msg.createdAt = date
      addNewMessage(msg)
    }

    socket.on('MSG_FROM_SERVER', onNewMessage)

    return () => {
      socket.off('MSG_FROM_SERVER')
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.inner}>
        {selectedConversation == null || Object.keys(oldMessages!).length == 0
          ? null
          : oldMessages![selectedConversation.id].map((value, index) => (
              <div key={index}>
                <Message message={value} />
              </div>
            ))}
        {selectedConversation == null || Object.keys(newMessages!).length == 0
          ? null
          : newMessages![selectedConversation.id].map((value, index) => (
              <div key={index}>
                <Message message={value} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default MessagesList
