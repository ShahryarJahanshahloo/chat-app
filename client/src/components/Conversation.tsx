import s from './Conversation.module.css'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useOldMessagesStore from '../store/useOldMessgesStore'
import request from '../lib/axios.js'
import { FC } from 'react'

type Props = {
  id: number
  name: string
}

const Conversation: FC<Props> = ({ id, name }) => {
  const conversation = useSelectedConversationStore(state => state.conversation)
  const oldMessages = useOldMessagesStore(state => state.messages)
  const setConversationMessages = useOldMessagesStore(
    state => state.setConversationMessages
  )
  const selectConversation = useSelectedConversationStore(
    state => state.selectConversation
  )
  const isSelected = conversation == null ? false : conversation.id == id

  async function clickHandler() {
    if (Object.keys(oldMessages).includes(`${id}`) == false) {
      const res = await request.get('/message/conversation/' + id)
      setConversationMessages(id, res.data.messages)
    }
    selectConversation({ id, name })
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
