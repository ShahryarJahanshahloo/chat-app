import s from './MembersModal.module.css'
import Modal from './Modal'
import { getConvMembers } from '../api/conversation'
import useRequest from '../hooks/useRequest'
import { useEffect } from 'react'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import ModalCloseIcon from './ModalCloseIcon'

type Props = {
  isOpen: boolean
  close: () => void
}

const MembersModal: React.FC<Props> = ({ close, isOpen }) => {
  const conv = useSelectedConversationStore(state => state.conversation)
  const { sendRequest: setMembersRequest, response: members } = useRequest(
    getConvMembers,
    res => {},
    err => {}
  )

  useEffect(() => {
    if (!isOpen) return
    setMembersRequest(conv?.id)
  }, [isOpen])

  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.close}>
            <ModalCloseIcon onClick={close} />
          </div>
          <div className={s.title}>Members</div>
        </div>
        <div className={s.list}>
          {members &&
            members.map(item => {
              return (
                <div className={s.member} key={item.user.id}>
                  {item.user.name}
                </div>
              )
            })}
        </div>
      </div>
    </Modal>
  )
}

export default MembersModal
