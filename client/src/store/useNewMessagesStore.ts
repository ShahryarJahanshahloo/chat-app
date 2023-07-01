import { create } from 'zustand'
import { ServerMessage } from '../lib/socket'

interface State {
  messages: {
    [key: number]: ServerMessage[]
  }
  initConversations: (
    conversations: {
      conversation: { id: number; name: string }
    }[]
  ) => void
  addNewMessage: (msg: ServerMessage) => void
}

const useNewMessagesStore = create<State>(set => ({
  messages: {},
  initConversations: conversations =>
    set(state => {
      const initialMessages: { [key: number]: ServerMessage[] } = {}
      for (const conversation of conversations) {
        initialMessages[conversation.conversation.id] = []
      }
      return { messages: initialMessages }
    }),
  addNewMessage: msg =>
    set(state => {
      const conversationId = msg.conversationId
      const prevMessages = { ...state.messages }
      prevMessages[conversationId].push(msg)
      return { messages: prevMessages }
    }),
}))

export default useNewMessagesStore
