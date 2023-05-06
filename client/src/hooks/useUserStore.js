import { create } from 'zustand'

const useUserStore = create(set => ({
  user: null,
  setUser: id =>
    set(() => {
      return { user: { id: id } }
    }),
}))

export default useUserStore
