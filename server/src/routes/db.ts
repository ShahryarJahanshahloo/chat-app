import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

router.get('/tables', async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany()
    const messages = await prisma.message.findMany()
    const users = await prisma.user.findMany()
    const usersOnConversations = await prisma.usersOnConversations.findMany()
    res.send({ conversations, messages, users, usersOnConversations })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.delete('/conversation/all', async (req, res) => {
  try {
    const result2 = await prisma.usersOnConversations.deleteMany()
    const result = await prisma.conversation.deleteMany()
    res.send({ result, result2 })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.delete('/conversation/:id', async (req, res) => {
  try {
    const result = await prisma.conversation.delete({
      where: {
        id: +req.params.id,
      },
    })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.delete('/message/all', async (req, res) => {
  try {
    const result = await prisma.message.deleteMany()
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.delete('/message/:id', async (req, res) => {
  try {
    const result = await prisma.message.delete({
      where: {
        id: +req.params.id,
      },
    })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

export default router
