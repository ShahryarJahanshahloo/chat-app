import s from './ChatMessage.module.css'
import useUserStore from '../store/useUserStore'
import { ServerMessage } from '../lib/socket'
import { FC } from 'react'

type Props = {
  message: ServerMessage
}

const ChatMessage: FC<Props> = ({ message }) => {
  const user = useUserStore(state => state.user)
  const sent = user == null ? false : message.authorId == user.id
  // const sent = false
  // const sent = true

  return (
    <div className={s.container}>
      <div className={sent ? s.innerSent : s.inner}>
        <div className={sent ? s.authorSent : s.author}>
          <div className={s.authorInner}>
            <div className={s.avatar}></div>
            <div className={s.date}>{message.createdAt.toString()}</div>
          </div>
        </div>
        <div className={`${s.textWrapper} ${sent && s.textWrapperSent}`}>
          <div className={sent ? s.authorNameSent : s.authorName}>
            {message.authorName}
          </div>
          <div className={`${s.text} ${sent && s.textSent}`}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
