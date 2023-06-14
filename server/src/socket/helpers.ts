import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

export async function auth(token: string) {
  try {
    if (token == null) throw new Error('no token found')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: +decoded.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    })
    return user
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function joinRooms(token: string, socket) {
  try {
    if (token == null) throw new Error('no token found')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const conversations = await prisma.usersOnConversations.findMany({
      where: {
        userId: +decoded.id,
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
    for (const conversation of conversations) {
      socket.join(conversation.conversation.id)
    }
    return conversations
  } catch (e) {
    console.log(e)
    return false
  }
}
