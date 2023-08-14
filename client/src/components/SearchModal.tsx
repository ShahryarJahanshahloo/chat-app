import s from './SearchModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useState, useRef } from 'react'
import useRequest from '../hooks/useRequest'
import { searchConvs, ApiConvSearch } from '../api/conversation'

type Props = {
  isOpen: boolean
  close: () => void
}

const SearchModal: React.FC<Props> = ({ isOpen, close }) => {
  const resultCache = useRef<{ [key: string]: ApiConvSearch[] }>({})
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ApiConvSearch[]>()
  const { response, sendRequest } = useRequest(
    searchConvs,
    res => {
      resultCache.current[query] = res
    },
    err => {}
  )

  const debouncedSetQuery = useDebouncedCallback(value => setQuery(value), 1000)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    debouncedSetQuery(e.target.value)
  }

  useEffect(() => {
    if (query.trim() === '') return
    if (!resultCache.current[query]) {
      sendRequest(query)
    } else {
      setResults(resultCache.current[query])
    }
  }, [query])

  return (
    <Modal close={close} isOpen={isOpen}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.close}>
            <ModalCloseIcon onClick={close} />
          </div>
          <div className={s.searchBarWrapper}>
            <div className={s.searchBar}>
              <input className={s.input} onChange={handleChange} />
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
