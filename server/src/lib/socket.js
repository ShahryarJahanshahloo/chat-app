import { Server } from 'socket.io'
import { auth, joinRooms } from '../socket/helpers.js'
import events from '../socket/events.js'
import prisma from './prisma.js'

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  })

  io.on('connection', async socket => {
    const conversations = await joinRooms(socket.handshake.auth.token, socket)
    if (conversations) {
      socket.emit(events.USER_CONVS, conversations)
    }

    socket.on(events.MSG_FROM_CLIENT, async msg => {
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

        io.to(msg.conversationId).emit(events.MSG_FROM_SERVER, {
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
