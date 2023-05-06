import MainSection from './MainSection'
import Conversations from './Conversations'
import s from './Home.module.css'

const Home = () => {
  return (
    <div className={s.flex}>
      <Conversations />
      <MainSection />
    </div>
  )
}

export default Home
