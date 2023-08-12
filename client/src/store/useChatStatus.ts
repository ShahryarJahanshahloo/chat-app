import { create } from 'zustand'

interface State {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useChatStatusStore = create<State>(set => ({
  isOpen: false,
  open: () =>
    set(state => {
      return { isOpen: true }
    }),
  close: () =>
    set(state => {
      return { isOpen: false }
    }),
}))

export default useChatStatusStore
