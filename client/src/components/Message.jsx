import s from './Message.module.css'

const Message = ({ value }) => {
  return (
    <div className={s.messageBlock}>
      <div className={s.inner}>
        <div className={s.avatar}></div>
        <div className={s.textWrapper}>
          <div className={s.text}>{value}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
