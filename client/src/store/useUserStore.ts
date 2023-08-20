import { create } from 'zustand'
import { ApiUser } from '../api/entities'

interface State {
  user?: ApiUser
  setUser: (user: ApiUser) => void
}

const useUserStore = create<State>(set => ({
  user: undefined,
  setUser: user =>
    set(() => {
      return { user: { ...user } }
    }),
}))

export default useUserStore
