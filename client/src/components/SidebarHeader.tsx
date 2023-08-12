import s from './SidebarHeader.module.css'
import {
  AiOutlineSearch as SearchIcon,
  AiOutlineSetting as SettingsIcon,
} from 'react-icons/ai'

const iconStyle = {
  fontSize: '24px',
}

const SidebarHeader = () => {
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.icon}>
          <SettingsIcon style={iconStyle} />
        </div>
        <div className={s.logo}>Chats</div>
        <div className={s.icon}>
          <SearchIcon style={iconStyle} />
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader
