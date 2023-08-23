import { FC, useState, useRef, useEffect } from 'react'
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
import useRequest from '../hooks/useRequest'
import { leaveConv, deleteConv } from '../api/conversation'
import PromptModal from './PromptModal'
import useModal from '../hooks/useModal'
import MembersModal from './MembersModal'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

const ChatToolbar: FC = () => {
  const navigate = useNavigate()
  const selectedConv = useSelectedConversationStore(state => state.conversation)
  const user = useUserStore(state => state.user)
  const close = useChatStatusStore(state => state.close)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [closeMembersModal, openMembersModal, isMembersModalOpen] = useModal()
  const [closeLeaveModal, openLeaveModal, isLeaveModalOpen] = useModal()
  const [closeDeleteModal, openDeleteModal, isDeleteModalOpen] = useModal()
  const dotsRef: React.MutableRefObject<any> = useRef(null)

  const { sendRequest: sendLeaveRequest } = useRequest(
    leaveConv,
    res => {
      navigate(0)
    },
    err => {}
  )

  const { sendRequest: sendDeleteRequest } = useRequest(
    deleteConv,
    res => {
      navigate(0)
    },
    err => {}
  )

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dotsRef.current && !dotsRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dotsRef])

  const handleCloseChat = () => {
    close()
  }

  return (
    <div className={s.container}>
      <MembersModal close={closeMembersModal} isOpen={isMembersModalOpen} />
      {user?.id !== selectedConv?.creatorId && (
        <PromptModal
          close={closeLeaveModal}
          confirmTitle='Yes, leave'
          description='Are you sure you want to leave this conversation? You can join again anytime.'
          handleConfirm={() => {
            sendLeaveRequest(selectedConv?.id)
          }}
          isOpen={isLeaveModalOpen}
          title='Leave Conversation'
        />
      )}
      {user?.id === selectedConv?.creatorId && (
        <PromptModal
          close={closeDeleteModal}
          confirmTitle='Yes, delete it'
          description='Are you sure you want to delete this conversation? All of the data will be lost.'
          handleConfirm={() => {
            sendDeleteRequest(selectedConv?.id)
          }}
          isOpen={isDeleteModalOpen}
          title='Delete Conversation'
        />
      )}
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
            setMenuOpen(true)
          }}
          ref={dotsRef}
        >
          <DotsIcon
            style={{
              fontSize: '22px',
            }}
          />
          <div
            className={`${s.menu} ${isMenuOpen ? s.menuVisible : s.menuHidden}`}
          >
            <div className={s.menuItem} onClick={openMembersModal}>
              <div className={s.menuIcon}>
                <MembersIcon />
              </div>
              <div className={s.menuText}>Members</div>
            </div>
            {user?.id !== selectedConv?.creatorId && (
              <div className={s.menuItem} onClick={openLeaveModal}>
                <div className={s.menuIcon}>
                  <LeaveIcon />
                </div>
                <div className={s.menuText}>Leave Chat</div>
              </div>
            )}
            {user?.id === selectedConv?.creatorId && (
              <div className={s.menuItem} onClick={openDeleteModal}>
                <div className={s.menuIcon}>
                  <TrashIcon />
                </div>
                <div className={s.menuText}>Delete Chat</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatToolbar
