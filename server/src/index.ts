import * as dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import app from './app.js'
import { Server } from 'socket.io'
import { IOType, initConnection } from './socket/index.js'

const server = http.createServer(app)
const io: IOType = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
})
io.attach(server)
initConnection(io)

server.listen(3001, () => {
  console.log('listening on port 3001')
})
