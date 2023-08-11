import { MouseEventHandler } from 'react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import s from './LogoutModal.module.css'

type Props = {
  showModal: boolean
  onClick: MouseEventHandler
}

const LogoutModal: React.FC<Props> = ({ showModal, onClick }) => {
  const navigate = useNavigate()

  const handleConfirm = () => {
    localStorage.removeItem('jwt')
    navigate('/login')
  }

  return (
    <Modal onClick={onClick} showModal={showModal}>
      <p>Logout</p>
      <p>
        Are you sure you would like to log out? You will be returned to the
        login screen
      </p>
      <button onClick={handleConfirm}>Yes, log out</button>
      <button>Cancel</button>
    </Modal>
  )
}

export default LogoutModal
