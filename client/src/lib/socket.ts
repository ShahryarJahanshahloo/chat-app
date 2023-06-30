import io from 'socket.io-client'

interface ServerToClientEvents {
  MSG_FROM_SERVER: (msg: Message) => void
  USER_CONVS: (
    conversations: {
      conversation: {
        id: number
        name: string
      }
    }[]
  ) => void
  WELCOME: () => void
}
interface ClientToServerEvents {
  MSG_FROM_CLIENT: (msg: Message) => Promise<void>
}

export const socket = io('http://localhost:3001', {
  reconnectionDelay: 1000,
  autoConnect: true,
  reconnection: true,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  auth: { token: localStorage.getItem('jwt') },
})

export type Message = {
  text: string
  conversationId: number
  createdAt: string
  authorId: number
  authorName: string
  authorColor: string
}
