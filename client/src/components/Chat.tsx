import Toolbar from './ChatToolbar'
import MessagesList from './ChatMessageList'
import Compose from './ChatFooter'
import s from './Chat.module.css'
import { FC } from 'react'
import useSelectedConversationStore from '../store/useSelectedConversationStore'

const MainSection: FC = () => {
  const selectedConversation = useSelectedConversationStore(
    state => state.conversation
  )

  return (
    <div className={s.main}>
      {selectedConversation && (
        <>
          <Toolbar />
          <MessagesList />
          <Compose />
        </>
      )}
    </div>
  )
}

export default MainSection
