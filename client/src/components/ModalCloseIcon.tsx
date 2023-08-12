import { AiOutlineArrowLeft as CloseIcon } from 'react-icons/ai'
import s from './ModalCloseIcon.module.css'
import { MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler
}

const ModalCloseIcon: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={s.wrapper} onClick={onClick}>
      <CloseIcon
        style={{
          fontSize: '24px',
          color: 'silver',
        }}
      />
    </div>
  )
}

export default ModalCloseIcon
