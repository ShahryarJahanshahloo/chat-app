import Toolbar from './Toolbar'
import MessagesList from './MessagesList'
import Compose from './Compose'
import s from './MainSection.module.css'

const MainSection = () => {
  return (
    <div className={s.main}>
      <Toolbar />
      <MessagesList />
      <Compose />
    </div>
  )
}

export default MainSection
