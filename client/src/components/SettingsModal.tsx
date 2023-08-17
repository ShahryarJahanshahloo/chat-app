import s from './SettingsModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'
import LogoutModal from './LogoutModal'
import useModal from '../hooks/useModal'

type Props = {
  isOpen: boolean
  close: () => void
}

const SettingsModal: React.FC<Props> = ({ isOpen, close }) => {
  const [closeLogoutModal, openLogoutModal, isLogoutModalOpen] = useModal()

  return (
    <Modal close={close} isOpen={isOpen}>
      <LogoutModal close={closeLogoutModal} isOpen={isLogoutModalOpen} />
      <div className={s.container}>
        <div className={s.headerTop}>
          <div className={s.close}>
            <ModalCloseIcon onClick={close} />
          </div>
          <div className={s.headerTitle}>Settings</div>
        </div>
        <div className={s.headerBottom}>
          <div className={s.name}>#Shahryar.JL</div>
          <div className={s.color}></div>
        </div>

        <div className={s.main}>
          <div className={s.profile}>
            <div className={s.title}>Profile</div>
            <div className={s.label}>username</div>
            <input className={s.input} placeholder='username'></input>
            <div className={s.label}>color</div>
            <input className={s.input} placeholder='color'></input>
            <div className={s.label}>old pass</div>
            <input className={s.input} placeholder='old pass'></input>
            <div className={s.label}>new pass</div>
            <input className={s.input} placeholder='new pass'></input>
            <div className={s.label}>repeat new pass</div>
            <input className={s.input} placeholder='repeat new pass'></input>
            <button>Save changes</button>
          </div>
          <div className={s.logout}>
            <div className={s.title}>Logout</div>
            <div className={s.description}>You can come back any time.</div>
            <button onClick={openLogoutModal} className={s.logoutButton}>
              Logout
            </button>
          </div>
          <div className={s.delete}>
            <div className={s.title}>Delete account</div>
            <div className={s.description}>
              Once you delete your account, there is no going back. Please be
              certain.
            </div>
            <button className={s.deleteButton}>Delete your account</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal
