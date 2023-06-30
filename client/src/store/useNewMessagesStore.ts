import { create } from 'zustand'
import { Message } from '../lib/socket'

interface State {
  messages: {
    [key: number]: Message[]
  }
  initConversations: (
    conversations: {
      conversation: { id: number; name: string }
    }[]
  ) => void
  addNewMessage: (msg: Message) => void
}

const useNewMessagesStore = create<State>(set => ({
  messages: {},
  initConversations: conversations =>
    set(state => {
      const initialMessages: { [key: number]: Message[] } = {}
      for (const conversation of conversations) {
        initialMessages[conversation.conversation.id] = []
      }
      return { messages: initialMessages }
    }),
  addNewMessage: msg =>
    set(state => {
      const conversationId = msg.conversationId
      const prevMessages = { ...state.messages }
      if (conversationId in Object.keys(state.messages)) {
        prevMessages[conversationId] = [...state.messages[conversationId], msg]
        return { messages: prevMessages }
      } else {
        // return { messages: { ...state.messages, conversationId: [msg] } }
        prevMessages[conversationId] = [msg]
        return { messages: prevMessages }
      }
    }),
}))

export default useNewMessagesStore
