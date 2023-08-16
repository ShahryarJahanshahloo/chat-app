import s from './SearchModal.module.css'
import Modal from './Modal'
import ModalCloseIcon from './ModalCloseIcon'
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useState, useRef } from 'react'
import useRequest from '../hooks/useRequest'
import { searchConvs, ApiConvSearch } from '../api/conversation'
import SearchCard from './SearchCard'
import SearchAlter from './SearchAlter'
import SearchNoResultAlter from './SearchNoResultAlter'

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
    res => {},
    err => {}
  )

  const debouncedSetQuery = useDebouncedCallback(value => setQuery(value), 1000)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    debouncedSetQuery(e.target.value)
  }

  useEffect(() => {
    console.log(resultCache.current)
    if (query.trim() === '') return
    if (!resultCache.current[query]) {
      sendRequest(query)
      if (!response) return
      resultCache.current[query] = response
      setResults(response)
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
          {results === undefined ? (
            <SearchAlter />
          ) : results.length == 0 ? (
            <SearchNoResultAlter />
          ) : (
            <div className={s.results}>
              {results.map(item => {
                return (
                  <SearchCard
                    key={item.id}
                    name={item.name}
                    members={item._count.members}
                    id={item.id}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal
