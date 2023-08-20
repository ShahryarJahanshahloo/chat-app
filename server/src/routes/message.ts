import express from 'express'
import prisma from '../lib/prisma'
import { Message } from '@prisma/client'

const router = express.Router()

router.get('/conversation/:id', async (req, res) => {
  try {
    const messages: (Message & {
      author?: { name: string; color: string }
      authorName?: string
      authorColor?: string
    })[] = await prisma.message.findMany({
      where: {
        conversationId: +req.params.id,
      },
      include: {
        author: { select: { name: true, color: true } },
      },
      orderBy: { createdAt: 'asc' },
    })
    messages.forEach(message => {
      message.authorName = message.author?.name
      message.authorColor = message.author?.color
      delete message.author
    })
    res.send({ messages })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

export default router
