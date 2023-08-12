import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import s from './LogoutModal.module.css'
import ModalCloseIcon from './ModalCloseIcon'

type Props = {
  isOpen: boolean
  close: () => void
}

const LogoutModal: React.FC<Props> = ({ isOpen, close }) => {
  const navigate = useNavigate()

  const handleConfirm = () => {
    localStorage.removeItem('jwt')
    navigate('/login')
  }

  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.header}>
        <ModalCloseIcon onClick={close} />
      </div>
      <div className={s.inner}>
        <p className={s.title}>Logout</p>
        <p className={s.description}>
          Are you sure you would like to log out? You will be returned to the
          login screen.
        </p>
        <div className={s.buttonWrapper}>
          <button className={s.confirm} onClick={handleConfirm}>
            Yes, log out
          </button>
          <button className={s.cancel} onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default LogoutModal
