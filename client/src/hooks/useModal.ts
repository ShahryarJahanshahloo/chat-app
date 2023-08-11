import { useCallback, useState } from 'react'

const useModal = (): [
  closeModal: () => void,
  openModal: () => void,
  isOpen: boolean
] => {
  const [isOpen, setOpen] = useState(false)

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  return [closeModal, openModal, isOpen]
}

export default useModal
