import { IOType, SocketType } from '../index'
import prisma from '../../lib/prisma'
import { ClientMessage } from '../index'

export default (io: IOType, socket: SocketType) => {
  async function clientMessageHandler(msg: ClientMessage) {
    try {
      const user = socket.data.user
      if (!user) throw new Error('invalid token')

      await prisma.message.create({
        data: {
          text: msg.text,
          authorId: user.id,
          conversationId: msg.conversationId,
          createdAt: msg.createdAt,
        },
      })

      io.to(`${msg.conversationId}`).emit('MSG_FROM_SERVER', {
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

  socket.on('MSG_FROM_CLIENT', clientMessageHandler)
}
