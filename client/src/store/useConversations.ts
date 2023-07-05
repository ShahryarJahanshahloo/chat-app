import { create } from 'zustand'

interface State {
  conversations?: { id: number; name: string }[]
  setConversations: (convs: { id: number; name: string }[]) => void
}

const useConversations = create<State>(set => ({
  conversations: undefined,
  setConversations: (convs: { id: number; name: string }[]) =>
    set(state => {
      return { conversations: convs }
    }),
}))

export default useConversations
