import s from './Message.module.css'
import useUserStore from '../hooks/useUserStore'

const Message = ({ value }) => {
  const user = useUserStore(state => state.user)
  const sent = value.author == user.id

  return (
    <div className={s.messageBlock}>
      <div className={sent ? s.innerSent : s.inner}>
        <div className={sent ? s.authorSent : s.author}>
          <div className={s.authorInner}>
            <div className={s.avatar}></div>
            <div className={s.date}>10:20</div>
          </div>
        </div>
        <div className={sent ? s.textWrapperSent : s.textWrapper}>
          <div className={sent ? s.textSent : s.text}>{value.text}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
