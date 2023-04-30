import { create } from 'zustand'

const useUserStore = create(set => ({
  user: {
    id: '132',
  },
}))

export default useUserStore
