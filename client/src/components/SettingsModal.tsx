import s from './SettingsModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'
import LogoutModal from './LogoutModal'
import useModal from '../hooks/useModal'
import useUserStore from '../store/useUserStore'

type Props = {
  isOpen: boolean
  close: () => void
}

const SettingsModal: React.FC<Props> = ({ isOpen, close }) => {
  const [closeLogoutModal, openLogoutModal, isLogoutModalOpen] = useModal()
  const user = useUserStore(state => state.user)

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
          <div className={s.name}>#{user?.username}</div>
          <div className={s.color}></div>
        </div>

        <div className={s.main}>
          <div className={s.profile}>
            <div className={s.title}>Profile</div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='username'>
                username
              </label>
              <input
                className={s.input}
                id='username'
                name='username'
                type='text'
                placeholder='username'
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>color</label>
              <input
                className={s.input}
                type='text'
                id='color'
                name='color'
                autoComplete='color'
                placeholder='color'
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='current-password'>
                current password
              </label>
              <input
                className={s.input}
                type='password'
                id='current-password'
                name='current-password'
                autoComplete='current-password'
                placeholder='current password'
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='new-password'>
                new pass
              </label>
              <input
                className={s.input}
                type='password'
                name='new-password'
                id='new-password'
                autoComplete='new-password'
                placeholder='new pass'
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='new-password-repeated'>
                repeat new pass
              </label>
              <input
                className={s.input}
                type='password'
                id='new-password-repeated'
                name='new-password-repeated'
                placeholder='repeat new pass'
              ></input>
            </div>

            <input type='submit' value='Save changes' />
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
