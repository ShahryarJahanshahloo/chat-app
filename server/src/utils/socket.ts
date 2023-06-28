import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'

interface JWTPayload {
  id: string
}

export async function auth(token: string) {
  try {
    if (token == null) throw new Error('no token found')
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
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

export async function joinRooms(token: string, socket: Socket) {
  try {
    if (token == null) throw new Error('no token found')
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
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
      socket.join(`${conversation.conversation.id}`)
    }
    return conversations
  } catch (e) {
    console.log(e)
    return false
  }
}
