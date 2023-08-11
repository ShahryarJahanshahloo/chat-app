import React, { MouseEventHandler } from 'react'
import s from './Modal.module.css'
import { AiOutlineClose as CloseIcon } from 'react-icons/ai'

type Props = {
  children: React.ReactNode
  showModal: boolean
  onClick: MouseEventHandler
}

const Modal: React.FC<Props> = ({ children, showModal, onClick }) => {
  const handleClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`${s.container} ${
        showModal ? s.containerVisible : s.containerHidden
      }`}
      onClick={onClick}
    >
      <div
        className={`${s.inner} ${showModal ? s.innerVisible : s.innerHidden}`}
        onClick={e => handleClick(e)}
      >
        <button className={s.close} onClick={onClick}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
