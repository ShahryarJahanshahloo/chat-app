import s from './SearchNoResultAlter.module.css'
import { MdOutlineSearchOff as SearchIcon } from 'react-icons/md'

const SearchNoResultAlter = () => {
  return (
    <div className={s.container}>
      <div className={s.icon}>
        <SearchIcon style={{ fontSize: '4.8rem' }} />
      </div>
      <div className={s.text}>Sorry! No result found :(</div>
    </div>
  )
}

export default SearchNoResultAlter
