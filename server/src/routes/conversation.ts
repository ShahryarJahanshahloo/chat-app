import express from 'express'
import auth from '../middlewares/auth'
import * as yup from 'yup'
import prisma from '../lib/prisma'

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const conversationInfo = req.body
  let conversationSchema = yup.object().shape({
    name: yup.string().required(),
  })

  try {
    const isValid = await conversationSchema.isValid(conversationInfo)
    if (!isValid) return res.status(400).send('invalid body')
    const conversation = await prisma.conversation.create({
      data: {
        ...conversationInfo,
        creatorId: +req.user.id,
        members: {
          create: [
            {
              userId: +req.user.id,
            },
          ],
        },
      },
    })
    res.status(201).send(conversation)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    const id = req.body.id
    if (!id) return res.status(400).send()
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: id,
      },
    })
    if (!conversation) return res.status(400).send()
    if (conversation.creatorId !== req.user.id) return res.status(401).send()
    const deltedConversation = await prisma.conversation.delete({
      where: {
        id: id,
      },
    })
    res.send(deltedConversation)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.post('/leave', auth, async (req, res) => {
  try {
    const id = req.body.id
    if (!id) return res.status(400).send()
    const conversation = await prisma.usersOnConversations.delete({
      where: {
        userId_conversationId: { conversationId: id, userId: req.user.id },
      },
    })
    res.send(conversation)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.post('/join', auth, async (req, res) => {
  try {
    await prisma.usersOnConversations.create({
      data: {
        userId: +req.user.id,
        conversationId: +req.body.conversation,
      },
    })
    res.send('joined')
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query as string
    const results = await prisma.conversation.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      take: 10,
    })
    res.send({ conversations: results, query: query })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.get('/:id/members', async (req, res) => {
  try {
    const members = await prisma.usersOnConversations.findMany({
      where: {
        conversationId: req.body.id,
      },
      select: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    })
    res.send(members)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

export default router
