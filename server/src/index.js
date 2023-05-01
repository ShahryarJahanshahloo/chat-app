import http from 'http'
import app from './app.js'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'

const server = http.createServer(app)
const prisma = new PrismaClient()
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on('connection', socket => {
  socket.on('chat_msg', msg => {
    io.emit('new_msg', msg)
  })
})

server.listen(3001, () => {
  console.log('listening on port 3001')
})
