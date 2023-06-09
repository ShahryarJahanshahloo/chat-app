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

export default router
