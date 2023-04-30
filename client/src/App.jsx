import { useState, useEffect } from 'react'
import { socket } from './lib/socket'
import useSocket from './hooks/useSocket'
import MainSection from './components/MainSection'
import './App.css'

function App() {
  const { isConnected, setIsConnected } = useSocket()

  return (
    <div>
      <MainSection />
    </div>
  )
}

export default App
