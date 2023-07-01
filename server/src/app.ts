import express from 'express'
import cors from 'cors'

import userRouter from './routes/user'
import conversationRouter from './routes/conversation'
import messageRouter from './routes/message'
import dbRouter from './routes/db'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/ping', (req, res) => {
  res.send('pong')
})

app.use('/user', userRouter)
app.use('/conversation', conversationRouter)
app.use('/message', messageRouter)
app.use('/db', dbRouter)

export default app
