import { create } from 'zustand'
import moment from 'moment'

const useOldMessagesStore = create(set => ({
  messages: {},
  initConversations: conversations =>
    set(state => {
      const initialMessages = {}
      for (const conversation of conversations) {
        initialMessages[conversation.conversation.id] = []
      }
      return { messages: initialMessages }
    }),
  setConversationMessages: (convId, messages) =>
    set(state => {
      const prevMessages = { ...state.messages }
      prevMessages[convId] = messages.map(item => {
        const date = moment(+item.createdAt).format('HH:mm')
        return { ...item, createdAt: date }
      })
      return { messages: prevMessages }
    }),
}))

export default useOldMessagesStore
