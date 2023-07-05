import { create } from 'zustand'

interface State {
  conversation?: { id: number; name: string }
  selectConversation: (conv: { id: number; name: string }) => void
}

const useSelectedConversationStore = create<State>(set => ({
  conversation: undefined,
  selectConversation: conv =>
    set(state => ({ conversation: { id: conv.id, name: conv.name } })),
}))

export default useSelectedConversationStore
