import { create } from 'zustand'

interface State {
  conversation?: { id: number; name: string; creatorId: number }
  selectConversation: (conv: {
    id: number
    name: string
    creatorId: number
  }) => void
}

const useSelectedConversationStore = create<State>(set => ({
  conversation: undefined,
  selectConversation: conv =>
    set(state => ({
      conversation: { id: conv.id, name: conv.name, creatorId: conv.creatorId },
    })),
}))

export default useSelectedConversationStore
