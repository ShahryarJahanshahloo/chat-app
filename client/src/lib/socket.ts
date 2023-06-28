import io from 'socket.io-client'

// interface ServerToClientEvents {
//   MSG_FROM_SERVER: (msg: {}) => void
//   USER_CONVS: (
//     conversations: {
//       conversation: {
//         id: number
//         name: string
//       }
//     }[]
//   ) => void
// }

// interface ClientToServerEvents {
//   MSG_FROM_CLIENT: (msg: any) => Promise<void>
// }

export const socket = io('http://localhost:3001', {
  reconnectionDelay: 1000,
  autoConnect: true,
  reconnection: true,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  auth: { token: localStorage.getItem('jwt') },
})
