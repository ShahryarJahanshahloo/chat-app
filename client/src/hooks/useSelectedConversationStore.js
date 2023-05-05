import { create } from 'zustand'

const useSelectedConversationStore = create(set => ({
  conversation: null,
  selectConversation: id => set(state => ({ conversation: { id: id } })),
}))

export default useSelectedConversationStore
