import { Server, Socket } from 'socket.io'
import registerMessageHandlers from './listeners/messageHandler'
import auth from './middlewares/auth'
import joinRooms from './middlewares/joinRooms'

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
      creatorId: number
    }[]
  ) => void
  WELCOME: () => void
}
interface ClientToServerEvents {
  MSG_FROM_CLIENT: (msg: ClientMessage) => Promise<void>
}
interface InterServerEvents {}
interface SocketData {
  user?: {
    id: number
    name: string
  }
}

export type IOType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export function initConnection(io: IOType) {
  io.use(auth)
  io.use(joinRooms)

  io.on('connection', async (socket: SocketType) => {
    registerMessageHandlers(io, socket)
  })
}

export type ServerMessage = {
  text: string
  conversationId: number
  createdAt: string | Date
  authorId: number
  authorName: string
}

export type ClientMessage = {
  text: string
  conversationId: number
  createdAt: string | Date
}
