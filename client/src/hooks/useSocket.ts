import { useState, useEffect } from 'react'
import { socket } from '../lib/socket'

function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.connect()
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      // if (isConnected) {
      //   socket.off('connect', onConnect)
      //   socket.off('disconnect', onDisconnect)
      //   socket.disconnect()
      // }
    }
  }, [])

  return {
    isConnected,
    setIsConnected,
  }
}

export default useSocket
