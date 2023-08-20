import { FC, useState } from 'react'
import s from './ChatToolbar.module.css'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import { AiOutlineArrowLeft as CloseIcon } from 'react-icons/ai'
import { RxExit as LeaveIcon } from 'react-icons/rx'
import {
  BsPeople as MembersIcon,
  BsTrash as TrashIcon,
  BsThreeDotsVertical as DotsIcon,
} from 'react-icons/bs'
import useChatStatusStore from '../store/useChatStatusStore'

const ChatToolbar: FC = () => {
  const selectedConv = useSelectedConversationStore(state => state.conversation)
  const close = useChatStatusStore(state => state.close)
  const [isMenuOpen, setMenuOpen] = useState(false)

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
            }}
          />
        </div>
        <div className={s.conv}>
          <div className={s.convName}>{selectedConv && selectedConv.name}</div>
        </div>
        <div
          className={s.dots}
          onClick={() => {
            setMenuOpen(prevState => !prevState)
          }}
        >
          <DotsIcon
            style={{
              fontSize: '22px',
            }}
          />
          <div
            className={`${s.menu} ${isMenuOpen ? s.menuVisible : s.menuHidden}`}
          >
            <div className={s.menuItem}>
              <div className={s.menuIcon}>
                <MembersIcon />
              </div>
              <div className={s.menuText}>Members</div>
            </div>
            <div className={s.menuItem}>
              <div className={s.menuIcon}>
                <LeaveIcon />
              </div>
              <div className={s.menuText}>Leave Chat</div>
            </div>
            <div className={s.menuItem}>
              <div className={s.menuIcon}>
                <TrashIcon />
              </div>
              <div className={s.menuText}>Delete Chat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatToolbar
