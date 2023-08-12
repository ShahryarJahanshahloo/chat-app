import React from 'react'
import s from './Modal.module.css'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  close: () => void
}

const Modal: React.FC<Props> = ({ children, isOpen, close }) => {
  const handleClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`${s.container} ${
        isOpen ? s.containerVisible : s.containerHidden
      }`}
      onClick={close}
    >
      <div
        className={`${s.inner} ${isOpen ? s.innerVisible : s.innerHidden}`}
        onClick={e => handleClick(e)}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
