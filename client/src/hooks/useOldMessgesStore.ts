import { create } from 'zustand'
import moment from 'moment'

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
  setConversationMessages: (convId: number, messages: any) => void
}

const useOldMessagesStore = create<State>(set => ({
  messages: null,
  initConversations: conversations =>
    set(state => {
      const initialMessages: { [key: number]: any[] } = {}
      for (const conversation of conversations) {
        initialMessages[conversation.conversation.id] = []
      }
      return { messages: initialMessages }
    }),
  setConversationMessages: (convId, messages) =>
    set(state => {
      const prevMessages = { ...state.messages }
      prevMessages[convId] = messages.map((item: any) => {
        const date = moment(+item.createdAt).format('HH:mm')
        return { ...item, createdAt: date }
      })
      return { messages: prevMessages }
    }),
}))

export default useOldMessagesStore
