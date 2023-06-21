import { create } from 'zustand'

interface State {
  conversation: { id: number } | null
  selectConversation: (id: number) => void
}

const useSelectedConversationStore = create<State>(set => ({
  conversation: null,
  selectConversation: id => set(state => ({ conversation: { id: id } })),
}))

export default useSelectedConversationStore
