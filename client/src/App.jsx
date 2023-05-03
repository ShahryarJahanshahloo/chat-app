import { useState, useEffect } from 'react'
import { socket } from './lib/socket'
import useSocket from './hooks/useSocket'
import MainSection from './components/MainSection'
import Conversations from './components/Conversations'
import s from './layout.module.css'
import './App.css'

function App() {
  const { isConnected, setIsConnected } = useSocket()

  return (
    <div id='App'>
      <div className={s.flex}>
        <Conversations />
        <MainSection />
      </div>
    </div>
  )
}

export default App
