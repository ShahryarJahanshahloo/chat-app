import MainSection from './Chat'
import Conversations from './Conversations'
import s from './Home.module.css'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className={s.flex}>
      <Conversations />
      <MainSection />
    </div>
  )
}

export default Home
