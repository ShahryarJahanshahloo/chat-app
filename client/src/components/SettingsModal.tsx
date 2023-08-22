import s from './SettingsModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'
import LogoutModal from './LogoutModal'
import useModal from '../hooks/useModal'
import useUserStore from '../store/useUserStore'
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai'
import ConversationModal from './ConversationModal'
import useRequest from '../hooks/useRequest'
import { updateUser, deleteUser } from '../api/user'
import { useNavigate } from 'react-router-dom'
import { FormEventHandler, useEffect, useState } from 'react'
import PromptModal from './PromptModal'

type Props = {
  isOpen: boolean
  close: () => void
}

const SettingsModal: React.FC<Props> = ({ isOpen, close }) => {
  const navigate = useNavigate()
  const [closeLogoutModal, openLogoutModal, isLogoutModalOpen] = useModal()
  const [closeConvModal, openConvModal, isConvModalOpen] = useModal()
  const [closeDeleteUserModal, openDeleteUserModal, isDeleteUserModalOpen] =
    useModal()
  const user = useUserStore(state => state.user)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string>()

  const { sendRequest: sendUpdateRequest } = useRequest(
    updateUser,
    res => {
      navigate(0)
    },
    err => {
      if (err.response?.status == 400) {
        setError(err.response?.data as string)
      } else {
        setError('an unkown error occured!')
      }
    }
  )

  const { sendRequest: sendDeleteRequest } = useRequest(
    deleteUser,
    res => {
      navigate(0)
    },
    err => {}
  )

  useEffect(() => {
    if (user) {
      setName(user.username)
    }
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setError(undefined)
    if (newPassword !== passwordRepeated)
      return setError('passwords dont match')
    if (name === '') return setError('please enter a name')
    sendUpdateRequest({ password: newPassword, name })
  }

  return (
    <Modal close={close} isOpen={isOpen}>
      <ConversationModal isOpen={isConvModalOpen} close={closeConvModal} />
      <LogoutModal close={closeLogoutModal} isOpen={isLogoutModalOpen} />
      <PromptModal
        close={closeDeleteUserModal}
        confirmTitle='Yes, delete my profile'
        description='Are you sure you want to delete your profile? All of your data will be lost.'
        handleConfirm={() => {
          sendDeleteRequest
        }}
        isOpen={isDeleteUserModalOpen}
        title='Delete Account'
      />
      <div className={s.container}>
        <div className={s.headerTop}>
          <div className={s.close}>
            <ModalCloseIcon onClick={close} />
          </div>
          <div className={s.headerTitle}>Settings</div>
          <div className={s.plus} onClick={openConvModal}>
            <PlusIcon
              style={{ fontSize: '2.4rem', color: 'var(--color-icon)' }}
            />
          </div>
        </div>
        <div className={s.headerBottom}>
          <div className={s.name}>#{user?.username}</div>
        </div>

        <div className={s.main}>
          <form className={s.profile} onSubmit={handleSubmit}>
            <div className={s.title}>Profile</div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='name'>
                Name
              </label>
              <input
                className={s.input}
                value={name}
                id='name'
                name='name'
                type='text'
                onChange={e => {
                  setName(e.target.value.trim())
                }}
                placeholder='Type your name'
                required
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='current-password'>
                Current Password
              </label>
              <input
                className={s.input}
                type='password'
                id='current-password'
                name='current-password'
                autoComplete='current-password'
                placeholder='current password'
                value={currentPassword}
                onChange={e => {
                  setCurrentPassword(e.target.value)
                }}
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='new-password'>
                New Password
              </label>
              <input
                className={s.input}
                type='password'
                name='new-password'
                id='new-password'
                autoComplete='new-password'
                placeholder='new pass'
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value)
                }}
              ></input>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label} htmlFor='new-password-repeated'>
                Repeat New Password
              </label>
              <input
                className={s.input}
                type='password'
                id='new-password-repeated'
                name='new-password-repeated'
                placeholder='repeat new pass'
                value={passwordRepeated}
                onChange={e => {
                  setPasswordRepeated(e.target.value)
                }}
              ></input>
            </div>

            <p className={s.error}>{error}</p>
            <input className={s.submit} type='submit' value='Save changes' />
          </form>
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
            <button className={s.deleteButton} onClick={openDeleteUserModal}>
              Delete your account
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal
