import { create } from 'zustand'
import moment from 'moment'
import { ServerMessage } from '../lib/socket'

interface State {
  messages: {
    [key: number]: ServerMessage[]
  }
  setConversationMessages: (convId: number, messages: ServerMessage[]) => void
}

const useOldMessagesStore = create<State>(set => ({
  messages: {},
  setConversationMessages: (convId, messages) =>
    set(state => {
      const prevMessages = { ...state.messages }
      prevMessages[convId] = messages.map(item => {
        const date = moment(item.createdAt).format('HH:mm')
        return { ...item, createdAt: date }
      })
      return { messages: prevMessages }
    }),
}))

export default useOldMessagesStore
