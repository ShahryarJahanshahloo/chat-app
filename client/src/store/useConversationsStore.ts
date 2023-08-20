import { create } from 'zustand'

export type Conversation = {
  id: number
  name: string
  lastMessage?: {
    text: string
    date: string | Date
  }
}

interface State {
  conversations?: Conversation[]
  setConversations: (convs: Conversation[]) => void
}

const useConversationsStore = create<State>(set => ({
  conversations: undefined,
  setConversations: convs =>
    set(state => {
      return { conversations: convs }
    }),
}))

export default useConversationsStore
