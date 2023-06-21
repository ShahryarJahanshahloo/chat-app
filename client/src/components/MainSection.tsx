import Toolbar from './Toolbar'
import MessagesList from './MessagesList'
import Compose from './Compose'
import s from './MainSection.module.css'
import { FC } from 'react'

const MainSection: FC = () => {
  return (
    <div className={s.main}>
      <Toolbar />
      <MessagesList />
      <Compose />
    </div>
  )
}

export default MainSection
