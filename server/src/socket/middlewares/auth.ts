import { Socket } from 'socket.io'
import prisma from '../../lib/prisma.js'
import jwt from 'jsonwebtoken'

interface JWTPayload {
  id: string
}

export default function auth(
  socket: Socket,
  next: (err?: Error) => void
): void {
  const token = socket.handshake.auth.token
  if (token == null) return next()
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
  prisma.user
    .findUniqueOrThrow({
      where: {
        id: +decoded.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    })
    .then(user => {
      socket.data.user = user
      next()
    })
    .catch(e => {
      next()
    })
}
