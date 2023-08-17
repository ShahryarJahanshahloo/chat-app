import express from 'express'
import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as yup from 'yup'
import auth from '../middlewares/auth'

const router = express.Router()

router.post('/', async (req, res) => {
  const userInfo = req.body
  let userSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
    name: yup.string().required(),
    color: yup.string(),
  })

  try {
    const isValid = await userSchema.isValid(userInfo)
    if (!isValid) return res.status(400).send('invalid body')
    userInfo.password = await bcrypt.hash(userInfo.password, 8)
    const user = await prisma.user.create({ data: userInfo })
    res.status(201).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    const user = await prisma.conversation.delete({
      where: {
        id: req.user.id,
      },
    })
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.patch('/', auth, async (req, res) => {
  try {
    const updates: any = {}
    if (req.body.name) updates.name = req.body.name
    if (req.body.color) updates.color = req.body.color
    if (req.body.password) updates.password = req.body.password
    const updateUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...updates,
      },
    })
    res.send(updateUser)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })
    if (!user)
      return res.status(404).send('no user found with the provided email')
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.status(401).send('invalid password')
    const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET)
    res.send({ token })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/auth', auth, async (req, res) => {
  res.send({ userId: req.user.id })
})

export default router
