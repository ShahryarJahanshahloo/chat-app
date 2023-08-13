import ChatToolbar from './ChatToolbar'
import ChatMessageList from './ChatMessageList'
import ChatFooter from './ChatFooter'
import s from './Chat.module.css'
import { FC } from 'react'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useChatStatusStore from '../store/useChatStatus'

const Chat: FC = () => {
  const selectedConversation = useSelectedConversationStore(
    state => state.conversation
  )
  const isChatPanelOpen = useChatStatusStore(state => state.isOpen)

  return (
    <div
      className={`${s.main} ${isChatPanelOpen ? s.mainVisible : s.mainHidden}`}
    >
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
