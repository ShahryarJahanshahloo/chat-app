import { useRef, useState, useEffect } from 'react'
import { socket, events } from '../lib/socket'
import s from './Conversations.module.css'
import Conversation from './Conversation'
import useNewMessagesStore from '../hooks/useNewMessagesStore'
import useOldMessagesStore from '../hooks/useOldMessgesStore'

const Conversations = () => {
  const [conversations, setConversations] = useState()
  const initNewConversations = useNewMessagesStore(
    state => state.initConversations
  )
  const initOldConversations = useOldMessagesStore(
    state => state.initConversations
  )

  useEffect(() => {
    function onConversations(convs) {
      initOldConversations(convs)
      initNewConversations(convs)
      setConversations(convs)
    }

    socket.on(events.USER_CONVS, onConversations)

    return () => {
      socket.off(events.USER_CONVS)
    }
  }, [])

  return (
    <div className={s.main}>
      <div className={s.inner}>
        <div className={s.title}>
          <div className={s.text}>Conversations</div>
        </div>
        <div className={s.convs}>
          {conversations
            ? conversations.map(item => {
                return (
                  <div key={item.conversation.id}>
                    <Conversation
                      id={item.conversation.id}
                      name={item.conversation.name}
                    />
                  </div>
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}

export default Conversations
