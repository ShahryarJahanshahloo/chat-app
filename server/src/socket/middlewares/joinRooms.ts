import prisma from '../../lib/prisma.js'
import { SocketType } from '../index.js'

export default function joinRooms(
  socket: SocketType,
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
        const normalizedConvs = conversations.map(item => {
          return {
            id: item.conversation.id,
            name: item.conversation.name,
          }
        })
        socket.emit('USER_CONVS', normalizedConvs)
      }
      next()
    })
    .catch(e => {
      console.log(e)
      next(e)
    })
}
