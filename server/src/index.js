import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

io.on('connection', socket => {
  console.log('a user connected')
})

server.listen(3001, () => {
  console.log('listening on *:3001')
})
