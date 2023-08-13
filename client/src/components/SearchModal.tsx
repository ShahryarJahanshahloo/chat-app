import s from './SearchModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai'

type Props = {
  isOpen: boolean
  close: () => void
}

const SearchModal: React.FC<Props> = ({ isOpen, close }) => {
  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.close}>
            <ModalCloseIcon onClick={close} />
          </div>
          <div className={s.searchBarWrapper}>
            <div className={s.searchBar}>
              <input className={s.input} />
              <div className={s.magnifier}>
                <SearchIcon
                  style={{
                    fontSize: '20px',
                    color: 'var(--color-icon)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.flex}>
          <div className={s.results}></div>
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal
