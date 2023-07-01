import Chat from './Chat'
import Sidebar from './Sidebar'
import s from './Home.module.css'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className={s.flex}>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default Home
