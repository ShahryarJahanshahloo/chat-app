import { useState, useEffect, FC } from 'react'
import { socket } from '../lib/socket'
import s from './Sidebar.module.css'
import Conversation from './Conversation'
import useNewMessagesStore from '../store/useNewMessagesStore'
import { useNavigate } from 'react-router-dom'
import request from '../lib/axios'
import useConversations from '../store/useConversations'

const Sidebar: FC = () => {
  const conversations = useConversations(state => state.conversations)
  const setConversations = useConversations(state => state.setConversations)
  const initNewConversations = useNewMessagesStore(
    state => state.initConversations
  )
  const navigate = useNavigate()

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

  const logoutHandler = () => {
    const res = confirm('Are you sure?')
    if (res) {
      localStorage.removeItem('jwt')
      navigate('/login')
    }
  }

  const newHandler = async () => {
    const convName = prompt('Choose a name')
    const res = await request.post('/conversation', { name: convName })
    if (res.status == 201) {
      alert('Conversation created successfully')
      navigate(0)
    } else {
      alert('An error occured')
    }
  }

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
                  <div key={item.id}>
                    <Conversation id={item.id} name={item.name} />
                  </div>
                )
              })
            : null}
        </div>
        <div className={s.bottom}>
          <div className={s.new} onClick={newHandler}>
            <div className={s.plus}>+</div>
            <div className={s.label}>New Conversation</div>
          </div>
          <div className={s.logout} onClick={logoutHandler}>
            <div className={s.label}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
