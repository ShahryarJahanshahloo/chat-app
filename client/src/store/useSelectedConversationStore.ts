import { create } from 'zustand'

interface State {
  conversation?: { id: number }
  selectConversation: (id: number) => void
}

const useSelectedConversationStore = create<State>(set => ({
  conversation: undefined,
  selectConversation: id => set(state => ({ conversation: { id: id } })),
}))

export default useSelectedConversationStore
