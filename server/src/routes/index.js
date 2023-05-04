import express from 'express'
import userRouter from './user.js'
import conversationRouter from './conversation.js'
import messageRouter from './message.js'

const router = express.Router()

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/user', userRouter)
router.use('/conversation', conversationRouter)
router.use('/message', messageRouter)

export default router
