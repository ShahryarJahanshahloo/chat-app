import { Socket } from 'socket.io'
import prisma from '../../lib/prisma.js'

interface JWTPayload {
  id: string
}

export default function joinRooms(
  socket: Socket,
  next: (err?: Error) => void
): void {
  if (!socket.data.user) return next()
  prisma.usersOnConversations
    .findMany({
      where: {
        userId: +socket.data.user.id,
      },
      select: {
        conversation: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    .then(conversations => {
      for (const conversation of conversations) {
        socket.join(`${conversation.conversation.id}`)
      }
      if (conversations) {
        socket.emit('USER_CONVS', conversations)
      }
      next()
    })
    .catch(e => {
      console.log(e)
      next(e)
    })
}
