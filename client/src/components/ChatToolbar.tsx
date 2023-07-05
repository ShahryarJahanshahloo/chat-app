import { FC } from 'react'
import s from './ChatToolbar.module.css'
import useSelectedConversationStore from '../store/useSelectedConversationStore'

const ChatToolbar: FC = () => {
  const selectedConv = useSelectedConversationStore(state => state.conversation)

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.conv}>
          <div className={s.convName}>{selectedConv && selectedConv.name}</div>
        </div>
      </div>
    </div>
  )
}

export default ChatToolbar
