import Modal from './Modal'
import s from './PromptModal.module.css'
import ModalCloseIcon from './ModalCloseIcon'

type Props = {
  isOpen: boolean
  close: () => void
  handleConfirm: () => void
  title: string
  description: string
  confirmTitle: string
}

const PromptModal: React.FC<Props> = ({
  isOpen,
  close,
  handleConfirm,
  title,
  description,
  confirmTitle,
}) => {
  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.header}>
        <ModalCloseIcon onClick={close} />
      </div>
      <div className={s.inner}>
        <p className={s.title}>{title}</p>
        <p className={s.description}>{description}</p>
        <div className={s.buttonWrapper}>
          <button className={s.confirm} onClick={handleConfirm}>
            {confirmTitle}
          </button>
          <button className={s.cancel} onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PromptModal
