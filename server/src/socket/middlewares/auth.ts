import { SocketType } from '../index.js'
import prisma from '../../lib/prisma.js'
import jwt from 'jsonwebtoken'

interface JWTPayload {
  id: string
}

export default async function auth(
  socket: SocketType,
  next: (err?: Error) => void
): Promise<void> {
  try {
    const token = socket.handshake.auth.token
    if (token == null) return next()
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: +decoded.id,
      },
      select: {
        id: true,
        name: true,
      },
    })
    socket.data.user = user
    next()
  } catch (error) {
    next(error as Error)
  }
}
