import s from './SearchCard.module.css'
import { useNavigate } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import { joinConv } from '../api/conversation'

type Props = {
  name: string
  id: number
  members: number
}

const SearchCard: React.FC<Props> = ({ id, members, name }) => {
  const navigate = useNavigate()

  const { sendRequest } = useRequest(
    joinConv,
    res => {
      navigate(0)
    },
    err => {}
  )

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.name}>{name}</div>
          <div className={s.members}>{members} members</div>
        </div>
        <div className={s.right}>
          <button
            className={s.join}
            onClick={() => {
              sendRequest(id)
            }}
          >
            join
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
