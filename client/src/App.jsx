import { useState, useEffect } from 'react'
import { socket } from './lib/socket'
import useSocket from './hooks/useSocket'
import MainSection from './components/MainSection'
import Conversations from './components/Conversations'
import s from './layout.module.css'
import './App.css'
import request from './lib/axios'
import useUserStore from './hooks/useUserStore'

function App() {
  const { isConnected, setIsConnected } = useSocket()
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    async function fetch() {
      const res = await request.post('/user/auth')
      if (res.status !== 200) {
        return
        // login/signup page
      }
      setUser(res.data.userId)
    }
    fetch()
  }, [])

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
