import io from 'socket.io-client'

export const events = {
  MSG_FROM_SERVER: 'MSG_FROM_SERVER',
  MSG_FROM_CLIENT: 'MSG_FROM_CLIENT',
  USER_CONVS: 'USER_CONVS',
}

export const socket = io('http://localhost:3001', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  auth: { token: localStorage.getItem('jwt') },
})
