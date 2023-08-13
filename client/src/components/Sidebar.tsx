import { useEffect, FC } from 'react'
import { socket } from '../lib/socket'
import s from './Sidebar.module.css'
import Conversation from './Conversation'
import useNewMessagesStore from '../store/useNewMessagesStore'
import useConversations from '../store/useConversations'
import ConversationModal from './ConversationModal'
import LogoutModal from './LogoutModal'
import useModal from '../hooks/useModal'
import SidebarHeader from './SidebarHeader'
import SidebarAlter from './SidebarAlter'

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
      <ConversationModal isOpen={isConvModalOpen} close={closeConvModal} />
      <LogoutModal isOpen={isLogoutModalOpen} close={closeLogoutModal} />
      <div className={s.inner}>
        <SidebarHeader />
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
        {conversations && conversations.length < 8 ? <SidebarAlter /> : null}
      </div>
    </div>
  )
}

export default Sidebar
