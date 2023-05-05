import s from './Conversation.module.css'
import useSelectedConversationStore from '../hooks/useSelectedConversationStore'

const Conversation = ({ id, name }) => {
  const { conversation, selectConversation } = useSelectedConversationStore(
    state => state
  )
  const isSelected = conversation == null ? false : conversation.id == id

  function clickHandler() {
    selectConversation(id)
  }

  return (
    <div
      className={isSelected ? s.mainSelected : s.main}
      onClick={clickHandler}
    >
      <div className={s.inner}>
        <div className={isSelected ? s.nameSelected : s.name}>{name}</div>
      </div>
    </div>
  )
}

export default Conversation
