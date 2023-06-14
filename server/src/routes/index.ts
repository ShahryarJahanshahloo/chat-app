import express from 'express'
import userRouter from './user'
import conversationRouter from './conversation'
import messageRouter from './message'

const router = express.Router()

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/user', userRouter)
router.use('/conversation', conversationRouter)
router.use('/message', messageRouter)

export default router
