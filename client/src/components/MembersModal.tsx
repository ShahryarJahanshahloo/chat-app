import s from './MembersModal.module.css'
import Modal from './Modal'
import { getConvMembers } from '../api/conversation'
import useRequest from '../hooks/useRequest'

type Props = {
  isOpen: boolean
  close: () => void
}

const MembersModal: React.FC<Props> = ({ close, isOpen }) => {
  const { sendRequest: setMembersRequest } = useRequest(
    getConvMembers,
    res => {},
    err => {}
  )

  return (
    <Modal close={close} isOpen={isOpen}>
      as
    </Modal>
  )
}

export default MembersModal
