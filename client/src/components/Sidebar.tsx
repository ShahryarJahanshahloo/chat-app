import { useEffect, FC } from 'react'
import { socket } from '../lib/socket'
import s from './Sidebar.module.css'
import Conversation from './Conversation'
import useNewMessagesStore from '../store/useNewMessagesStore'
import useConversations from '../store/useConversations'
import ConversationModal from './ConversationModal'
import LogoutModal from './LogoutModal'
import useModal from '../hooks/useModal'

const Sidebar: FC = () => {
  const conversations = useConversations(state => state.conversations)
  const setConversations = useConversations(state => state.setConversations)
  const initNewConversations = useNewMessagesStore(
    state => state.initConversations
  )
  const [closeConvModal, openConvModal, isConvModalOpen] = useModal()
  const [closeLogoutModal, openLogoutModal, isLogoutModalOpen] = useModal()

  useEffect(() => {
    function onConversations(convs: { id: number; name: string }[]) {
      initNewConversations(convs)
      setConversations(convs)
    }
    socket.on('USER_CONVS', onConversations)

    return () => {
      socket.off('USER_CONVS')
    }
  }, [])

  return (
    <div className={s.main}>
      <ConversationModal showModal={isConvModalOpen} onClick={closeConvModal} />
      <LogoutModal showModal={isLogoutModalOpen} onClick={closeLogoutModal} />
      <div className={s.inner}>
        <div className={s.title}>
          <div className={s.text}>Conversations</div>
        </div>
        <div className={s.convs}>
          {conversations
            ? conversations.map(item => {
                return (
                  <div key={item.id}>
                    <Conversation id={item.id} name={item.name} />
                  </div>
                )
              })
            : null}
        </div>
        <div className={s.bottom}>
          <div className={s.new} onClick={openConvModal}>
            <div className={s.plus}>+</div>
            <div className={s.label}>New Conversation</div>
          </div>
          <div className={s.logout} onClick={openLogoutModal}>
            <div className={s.label}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
