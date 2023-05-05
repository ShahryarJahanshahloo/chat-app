import s from './Conversation.module.css'

const Conversation = ({ id, name }) => {
  return <div className={s.main}>{name}</div>
}

export default Conversation
