import io from 'socket.io-client'

export const events = {
  MSG_COMPOSED: 'MSG_COMPOSED',
  MSG_RECIEVED: 'MSG_RECIEVED',
}

export const socket = io('http://localhost:3001', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
})
