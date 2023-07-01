import express from 'express'
import prisma from '../lib/prisma'
import { Message } from '@prisma/client'

const router = express.Router()

router.get('/conversation/:id', async (req, res) => {
  try {
    const messages: (Message & {
      author?: { name: string }
      authorName?: string
    })[] = await prisma.message.findMany({
      where: {
        conversationId: +req.params.id,
      },
      include: {
        author: { select: { name: true } },
      },
      orderBy: { createdAt: 'asc' },
    })
    messages.forEach(message => {
      message.authorName = message.author?.name
      delete message.author
    })
    res.send({ messages })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

export default router
