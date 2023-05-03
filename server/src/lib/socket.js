import { Server } from 'socket.io'

const events = {
  MSG_COMPOSED: 'MSG_COMPOSED',
  MSG_RECIEVED: 'MSG_RECIEVED',
}

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  })

  io.on('connection', socket => {
    socket.on(events.MSG_COMPOSED, msg => {
      io.emit(events.MSG_RECIEVED, msg)
    })
  })
}
