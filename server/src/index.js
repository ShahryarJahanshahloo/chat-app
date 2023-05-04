import * as dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import app from './app.js'
import initSocket from './lib/socket.js'

const server = http.createServer(app)
initSocket(server)

server.listen(3001, () => {
  console.log('listening on port 3001')
})
