import s from './ChatAlter.module.css'
import { BsFillChatLeftTextFill as MessageIcon } from 'react-icons/bs'

const ChatAlter = () => {
  return (
    <div className={s.container}>
      <div className={s.icon}>
        <MessageIcon style={{ fontSize: '8.4rem' }} />
      </div>
      <div className={s.title}>No chat messages</div>
      <div className={s.description}>
        Start conversing to see your messages here.
      </div>
    </div>
  )
}

export default ChatAlter
