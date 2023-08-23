import { FormEventHandler, useState } from 'react'
import Modal from './Modal'
import s from './ConversationModal.module.css'
import { useNavigate } from 'react-router-dom'
import ModalCloseIcon from './ModalCloseIcon'
import useRequest from '../hooks/useRequest'
import { createConv } from '../api/conversation'

type Props = {
  isOpen: boolean
  close: () => void
}

const ConversationModal: React.FC<Props> = ({ isOpen, close }) => {
  const [convName, setConvName] = useState('')
  const navigate = useNavigate()
  const { sendRequest } = useRequest(
    createConv,
    res => navigate(0),
    err => {}
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    sendRequest({ name: convName })
  }

  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.header}>
        <ModalCloseIcon onClick={close} />
      </div>
      <div className={s.inner}>
        <p className={s.title}>Create New Conversation</p>
        <p className={s.description}>
          Other users will be able to join using search bar.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            name='convName'
            value={convName}
            onChange={e => {
              setConvName(e.target.value.trim())
            }}
            required
            minLength={3}
            maxLength={31}
            className={s.input}
            type='text'
            placeholder='Choose a name'
          />
          <div className={s.buttonWrapper}>
            <input className={s.submit} type='submit' value='submit' />
            <button
              className={s.cancel}
              onClick={e => {
                e.preventDefault()
                close()
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ConversationModal
