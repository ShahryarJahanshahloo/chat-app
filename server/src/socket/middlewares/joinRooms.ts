import prisma from '../../lib/prisma.js'
import { SocketType } from '../index.js'

type Conversation = {
  id: number
  name: string
  lastMessage?: {
    text: string
    date: Date | string
  }
  creatorId: number
}

export default async function joinRooms(
  socket: SocketType,
  next: (err?: Error) => void
): Promise<void> {
  try {
    if (!socket.data.user) return next()
    const conversations: { conversation: Conversation }[] =
      await prisma.usersOnConversations.findMany({
        where: {
          userId: +socket.data.user.id,
        },
        select: {
          conversation: {
            select: {
              id: true,
              name: true,
              creatorId: true,
            },
          },
        },
      })
    if (!conversations) return next()
    for (const conversation of conversations) {
      socket.join(`${conversation.conversation.id}`)
    }
    for (const conversation of conversations) {
      const message = await prisma.message.findFirst({
        where: {
          conversationId: conversation.conversation.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          text: true,
          createdAt: true,
        },
      })
      if (!message) continue
      conversation.conversation.lastMessage = {
        date: message.createdAt,
        text: message.text,
      }
    }
    const normalizedConvs = conversations.map(item => {
      return {
        id: item.conversation.id,
        name: item.conversation.name,
        lastMessage: item.conversation.lastMessage,
        creatorId: item.conversation.creatorId,
      }
    })
    socket.emit('USER_CONVS', normalizedConvs)
    next()
  } catch (error) {
    console.log(error)
    next(error as Error)
  }
}
