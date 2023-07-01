import ChatToolbar from './ChatToolbar'
import ChatMessageList from './ChatMessageList'
import ChatFooter from './ChatFooter'
import s from './Chat.module.css'
import { FC } from 'react'
import useSelectedConversationStore from '../store/useSelectedConversationStore'

const Chat: FC = () => {
  const selectedConversation = useSelectedConversationStore(
    state => state.conversation
  )

  return (
    <div className={s.main}>
      {selectedConversation && (
        <>
          <ChatToolbar />
          <ChatMessageList />
          <ChatFooter />
        </>
      )}
    </div>
  )
}

export default Chat
