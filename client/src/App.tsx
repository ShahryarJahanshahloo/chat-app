import { useEffect } from 'react'
import useSocket from './hooks/useSocket'
import './App.css'
import useUserStore from './store/useUserStore'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import useRequest from './hooks/useRequest'
import { auth } from './api/auth'
import Singup from './components/Singup'

function App() {
  const { isConnected, setIsConnected } = useSocket()
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)
  const { sendRequest } = useRequest(
    auth,
    res => setUser(res),
    err => {
      if (err.response?.status === 401) {
        navigate('/login')
        return
      }
    }
  )

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <div id='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
      </Routes>
    </div>
  )
}

export default App
