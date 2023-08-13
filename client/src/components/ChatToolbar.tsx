import { FC } from 'react'
import s from './ChatToolbar.module.css'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import { AiOutlineArrowLeft as CloseIcon } from 'react-icons/ai'
import useChatStatusStore from '../store/useChatStatus'

const ChatToolbar: FC = () => {
  const selectedConv = useSelectedConversationStore(state => state.conversation)
  const close = useChatStatusStore(state => state.close)

  const handleCloseChat = () => {
    close()
  }

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.closeIcon} onClick={handleCloseChat}>
          <CloseIcon
            style={{
              fontSize: '22px',
              // color: 'silver',
            }}
          />
        </div>
        <div className={s.conv}>
          <div className={s.convName}>{selectedConv && selectedConv.name}</div>
        </div>
      </div>
    </div>
  )
}

export default ChatToolbar
