import useModal from '../hooks/useModal'
import s from './SidebarHeader.module.css'
import {
  AiOutlineSearch as SearchIcon,
  AiOutlineSetting as SettingsIcon,
} from 'react-icons/ai'
import SearchModal from './SearchModal'

const iconStyle = {
  fontSize: '24px',
  color: 'var(--color-icon)',
}

const SidebarHeader = () => {
  const [closeSearchModal, openSearchModal, isSearchModalOpen] = useModal()

  return (
    <div className={s.container}>
      <SearchModal isOpen={isSearchModalOpen} close={closeSearchModal} />
      <div className={s.inner}>
        <div className={s.icon}>
          <SettingsIcon style={iconStyle} />
        </div>
        <div className={s.logo}>Chats</div>
        <div className={s.icon} onClick={openSearchModal}>
          <SearchIcon style={iconStyle} />
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader
