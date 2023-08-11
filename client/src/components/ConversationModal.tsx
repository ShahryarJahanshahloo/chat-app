import { MouseEventHandler, useState } from 'react'
import Modal from './Modal'
import request from '../lib/axios'
import s from './ConversationModal.module.css'
import { useNavigate } from 'react-router-dom'

type Props = {
  showModal: boolean
  onClick: MouseEventHandler
}

const ConversationModal: React.FC<Props> = ({ showModal, onClick }) => {
  const [convName, setConvName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const res = await request.post('/conversation', { name: convName })
    if (res.status == 201) {
      alert('Conversation created successfully')
      navigate(0)
    } else {
      alert('An error occured')
    }
  }

  return (
    <Modal onClick={onClick} showModal={showModal}>
      <p>Create New Conversation</p>
      <p>Other users will be able to join using search bar.</p>
      <form>
        <input type='text' />
        <input type='submit' value='submit' />
      </form>
    </Modal>
  )
}

export default ConversationModal
