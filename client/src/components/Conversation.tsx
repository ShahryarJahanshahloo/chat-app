import s from './Conversation.module.css'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useOldMessagesStore from '../store/useOldMessgesStore'
import request from '../lib/axios.js'
import { FC } from 'react'
import useChatStatusStore from '../store/useChatStatus'
import { Conversation as ConversationType } from '../store/useConversations'

type Props = {
  data: ConversationType
}

const Conversation: FC<Props> = ({ data }) => {
  const conversation = useSelectedConversationStore(state => state.conversation)
  const oldMessages = useOldMessagesStore(state => state.messages)
  const openChatPanel = useChatStatusStore(state => state.open)
  const setConversationMessages = useOldMessagesStore(
    state => state.setConversationMessages
  )
  const selectConversation = useSelectedConversationStore(
    state => state.selectConversation
  )
  const isSelected = conversation == null ? false : conversation.id == data.id

  async function clickHandler() {
    if (Object.keys(oldMessages).includes(`${data.id}`) == false) {
      const res = await request.get('/message/conversation/' + data.id)
      setConversationMessages(data.id, res.data.messages)
    }
    selectConversation({ id: data.id, name: data.name })
    openChatPanel()
  }

  return (
    <div
      className={`${s.main} ${isSelected && s.mainSelected}`}
      onClick={clickHandler}
    >
      <div className={s.inner}>
        <div className={s.innerLeft}>
          <div className={isSelected ? s.nameSelected : s.name}>
            {data.name}
          </div>
          <div className={s.message}>{data.lastMessage?.text}</div>
        </div>
        <div className={s.innerRight}>
          <div className={s.date}>{data.lastMessage?.date.toString()}</div>
        </div>
      </div>
    </div>
  )
}

export default Conversation
