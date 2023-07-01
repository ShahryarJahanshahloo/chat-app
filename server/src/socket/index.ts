import { Server, Socket } from 'socket.io'
import registerMessageHandlers from './listeners/messageHandler'
import auth from './middlewares/auth'
import joinRooms from './middlewares/joinRooms'

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
interface InterServerEvents {}
interface SocketData {
  user?: {
    id: number
    name: string
    color: string
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

export type Message = {
  text: string
  conversationId: number
  createdAt: number | bigint
  authorId: number
  authorName: string
  authorColor: string
}
