import io, { Socket } from 'socket.io-client'

interface ServerToClientEvents {
  MSG_FROM_SERVER: (msg: ServerMessage) => void
  USER_CONVS: (
    conversations: {
      id: number
      name: string
      lastMessage?: {
        text: string
        date: string | Date
      }
    }[]
  ) => void
  WELCOME: () => void
}
interface ClientToServerEvents {
  MSG_FROM_CLIENT: (msg: ClientMessage) => Promise<void>
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3001',
  {
    reconnectionDelay: 1000,
    autoConnect: true,
    reconnection: true,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    auth: { token: localStorage.getItem('jwt') },
  }
)

export type ServerMessage = {
  text: string
  conversationId: number
  createdAt: string | Date
  authorId: number
  authorName: string
  authorColor: string
}

export type ClientMessage = {
  text: string
  conversationId: number
  createdAt: string | Date
}
