import { Server } from 'socket.io'
import { auth, joinRooms } from '../socket/helpers'
import prisma from './prisma'
import http from 'http'

interface ServerToClientEvents {
  MSG_FROM_SERVER: (msg: {}) => void
  USER_CONVS: (
    conversations: {
      conversation: {
        id: number
        name: string
      }
    }[]
  ) => void
}

interface ClientToServerEvents {
  MSG_FROM_CLIENT: (msg: any) => Promise<void>
}

interface InterServerEvents {}

interface SocketData {}

export default function initSocket(server: http.Server) {
  const io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  > = new Server({
    cors: {
      origin: 'http://localhost:3000',
    },
  })
  io.attach(server)

  io.on('connection', async socket => {
    const conversations = await joinRooms(socket.handshake.auth.token, socket)
    if (conversations) {
      socket.emit('USER_CONVS', conversations)
    }

    socket.on('MSG_FROM_CLIENT', async msg => {
      try {
        const user = await auth(socket.handshake.auth.token)
        if (!user) throw new Error('invalid token')

        const message = await prisma.message.create({
          data: {
            text: msg.text,
            authorId: user.id,
            conversationId: msg.conversationId,
            createdAt: msg.createdAt,
          },
        })

        io.to(msg.conversationId).emit('MSG_FROM_SERVER', {
          text: msg.text,
          conversationId: msg.conversationId,
          createdAt: msg.createdAt,
          authorId: user.id,
          authorName: user.name,
          authorColor: user.color,
        })
      } catch (error) {
        console.log(error)
        // TODO: handle error
      }
    })
  })
}
