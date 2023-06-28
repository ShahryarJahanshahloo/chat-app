import { IOType, SocketType } from './index'
import { auth } from '../utils/socket'
import prisma from '../lib/prisma'

export default (io: IOType) => {
  async function clientMessageHandler(msg: any, socket: SocketType) {
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
  }

  return {
    clientMessageHandler,
  }
}
