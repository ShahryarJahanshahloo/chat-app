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
        <div className={s.iconLeft}>
          <SettingsIcon style={iconStyle} />
        </div>
        <div className={s.titleWrapper}>
          <div className={s.title}>Chats</div>
        </div>
        <div className={s.iconRight} onClick={openSearchModal}>
          <SearchIcon style={iconStyle} />
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader
