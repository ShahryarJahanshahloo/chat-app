import { Server, Socket } from 'socket.io'
import { joinRooms } from '../utils/socket'
import messageHandler from './messageHandler'

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
interface SocketData {}

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
  io.on('connection', async (socket: SocketType) => {
    const { clientMessageHandler } = messageHandler(io)

    const conversations = await joinRooms(socket.handshake.auth.token, socket)
    if (conversations) {
      socket.emit('USER_CONVS', conversations)
    }

    socket.on('MSG_FROM_CLIENT', clientMessageHandler)
  })
}

export type Message = {
  text: string
  conversationId: number
  createdAt: string
  authorId: number
  authorName: string
  authorColor: string
}
