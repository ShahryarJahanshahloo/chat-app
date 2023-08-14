import s from './SettingsModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'

type Props = {
  isOpen: boolean
  close: () => void
}

const SettingsModal: React.FC<Props> = ({ isOpen, close }) => {
  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.container}></div>
    </Modal>
  )
}

export default SettingsModal
