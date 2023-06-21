import { create } from 'zustand'

interface State {
  user: { id: number } | null
  setUser: (id: number) => void
}

const useUserStore = create<State>(set => ({
  user: null,
  setUser: id =>
    set(() => {
      return { user: { id: id } }
    }),
}))

export default useUserStore
