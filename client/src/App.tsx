import { useEffect } from 'react'
import useSocket from './hooks/useSocket'
import './App.css'
import request from './lib/axios'
import useUserStore from './hooks/useUserStore'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  const { isConnected, setIsConnected } = useSocket()
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    async function fetch() {
      const res = await request.post('/user/auth')
      if (res.status !== 200) {
        navigate('/login')
        return
      }
      setUser(res.data.userId)
    }
    fetch()
  }, [])

  return (
    <div id='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
