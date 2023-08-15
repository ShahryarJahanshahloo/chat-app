import s from './SearchCard.module.css'

type Props = {
  name: string
  id: number
  members: number
}

const SearchCard: React.FC<Props> = ({ id, members, name }) => {
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.name}>{name}</div>
          <div className={s.members}>{members} members</div>
        </div>
        <div className={s.right}>
          <button className={s.join}>join</button>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
