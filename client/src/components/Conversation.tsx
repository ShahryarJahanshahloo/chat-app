import s from './Conversation.module.css'
import useSelectedConversationStore from '../store/useSelectedConversationStore'
import useOldMessagesStore from '../store/useOldMessgesStore'
import { FC } from 'react'
import useChatStatusStore from '../store/useChatStatusStore'
import { Conversation as ConversationType } from '../store/useConversationsStore'
import { getConversationDate } from '../utils/date'
import useRequest from '../hooks/useRequest'
import { getConvMessages } from '../api/message'

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
  const { sendRequest } = useRequest(
    getConvMessages,
    res => {
      setConversationMessages(data.id, res.messages)
      selectConversation({ id: data.id, name: data.name })
      openChatPanel()
    },
    err => {}
  )

  async function clickHandler() {
    if (Object.keys(oldMessages).includes(`${data.id}`) == false) {
      sendRequest(data.id)
    } else {
      selectConversation({ id: data.id, name: data.name })
      openChatPanel()
    }
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
          <div className={s.message}>
            {data.lastMessage ? data.lastMessage.text : null}
          </div>
        </div>
        <div className={s.innerRight}>
          <div className={s.date}>
            {data.lastMessage && getConversationDate(data.lastMessage.date)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation
