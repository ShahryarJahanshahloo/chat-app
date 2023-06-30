import { create } from 'zustand'

interface State {
  user?: { id: number }
  setUser: (id: number) => void
}

const useUserStore = create<State>(set => ({
  user: undefined,
  setUser: id =>
    set(() => {
      return { user: { id: id } }
    }),
}))

export default useUserStore
