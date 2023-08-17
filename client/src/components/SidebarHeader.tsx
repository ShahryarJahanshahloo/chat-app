import useModal from '../hooks/useModal'
import s from './SidebarHeader.module.css'
import {
  AiOutlineSearch as SearchIcon,
  AiOutlineSetting as SettingsIcon,
} from 'react-icons/ai'
import SearchModal from './SearchModal'
import SettingsModal from './SettingsModal'

const iconStyle = {
  fontSize: '24px',
  color: 'var(--color-icon)',
}

const SidebarHeader = () => {
  const [closeSearchModal, openSearchModal, isSearchModalOpen] = useModal()
  const [closeSettingsModal, openSettingsModal, isSettingsModalOpen] =
    useModal()

  return (
    <div className={s.container}>
      <SearchModal isOpen={isSearchModalOpen} close={closeSearchModal} />
      <SettingsModal isOpen={isSettingsModalOpen} close={closeSettingsModal} />
      <div className={s.inner}>
        <div className={s.iconLeft} onClick={openSettingsModal}>
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
