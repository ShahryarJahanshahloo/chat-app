import { create } from 'zustand'

type messageType = {
  text: string
  conversationId: number
  createdAt: string
  authorId: number
  authorName: string
  authorColor: string
}

interface State {
  messages: {
    [key: number]: messageType[]
  } | null
  initConversations: (
    conversations: {
      conversation: { id: number; name: string }
    }[]
  ) => void
  addNewMessage: (msg: messageType) => void
}

const useNewMessagesStore = create<State>(set => ({
  messages: null,
  initConversations: conversations =>
    set(state => {
      const initialMessages: { [key: number]: any[] } = {}
      for (const conversation of conversations) {
        initialMessages[conversation.conversation.id] = []
      }
      return { messages: initialMessages }
    }),
  addNewMessage: msg =>
    set(state => {
      const conversationId = msg.conversationId
      const prevMessages = { ...state.messages }
      if (conversationId in Object.keys(state.messages!)) {
        prevMessages[conversationId] = [...state.messages![conversationId], msg]
        return { messages: prevMessages }
      } else {
        // return { messages: { ...state.messages, conversationId: [msg] } }
        prevMessages[conversationId] = [msg]
        return { messages: prevMessages }
      }
    }),
}))

export default useNewMessagesStore
