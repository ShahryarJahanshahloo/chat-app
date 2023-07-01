import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

router.get('/conversation/:id', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: +req.params.id,
      },
      orderBy: { createdAt: 'asc' },
    })
    res.send({ messages })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

export default router
