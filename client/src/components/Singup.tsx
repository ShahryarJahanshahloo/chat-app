import { useState, ChangeEventHandler, FormEventHandler } from 'react'
import s from './Singup.module.css'
import { CiUser as UserIcon, CiLock as LockIcon } from 'react-icons/ci'
import { BiFace as FaceIcon } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import { createUser } from '../api/user'
import { useNavigate } from 'react-router-dom'

const Singup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string>()
  const { sendRequest } = useRequest(
    createUser,
    res => {
      localStorage.setItem('jwt', res.token)
      navigate('/')
      navigate(0)
    },
    err => {
      if (err.response?.status == 400) {
        setError(err.response?.data as string)
      } else {
        setError('an unkown error occured!')
      }
    }
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setError(undefined)
    if (email === '') return setError('please enter a valid email')
    if (password !== passwordRepeated) return setError('passwords dont match')
    if (name === '') return setError('please enter a name')
    sendRequest({ email, password, name })
  }

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = e => {
    setEmail(e.target.value.trim())
  }

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value)
  }

  const handlePasswordRepeatedChange: ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setPasswordRepeated(e.target.value)
  }

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    setName(e.target.value.trim())
  }

  return (
    <div className={s.container}>
      <div className={s.box}>
        <div className={s.inner}>
          <div className={s.header}>
            <p className={s.title}>Signup</p>
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.label} htmlFor='email'>
              Email
            </label>
            <div className={s.inputGroup}>
              <div className={s.icon}>
                <UserIcon />
              </div>
              <input
                id='email'
                className={s.input}
                name='email'
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Type your email'
                required
              />
            </div>

            <label className={s.label} htmlFor='password'>
              Password
            </label>
            <div className={s.inputGroup}>
              <div className={s.icon}>
                <LockIcon />
              </div>
              <input
                id='password'
                name='password'
                type='password'
                required
                maxLength={15}
                minLength={6}
                className={s.input}
                value={password}
                onChange={handlePasswordChange}
                placeholder='Type your password'
              />
            </div>

            <label className={s.label} htmlFor='password-repeated'>
              Repeat password
            </label>
            <div className={s.inputGroup}>
              <div className={s.icon}>
                <LockIcon />
              </div>
              <input
                id='password-repeated'
                name='password-repeated'
                type='password'
                required
                maxLength={15}
                minLength={6}
                className={s.input}
                value={passwordRepeated}
                onChange={handlePasswordRepeatedChange}
                placeholder='Type your password again'
              />
            </div>

            <label className={s.label} htmlFor='name'>
              name
            </label>
            <div className={s.inputGroup}>
              <div className={s.icon}>
                <FaceIcon style={{ color: 'var(--color-text-2)' }} />
              </div>
              <input
                id='name'
                name='name'
                type='text'
                required
                maxLength={63}
                minLength={3}
                className={s.input}
                value={name}
                onChange={handleNameChange}
                placeholder='Choose a name to display to others'
              />
            </div>

            <p className={s.error}>{error}</p>
            <input className={s.submit} type='submit' value='Submit' />
          </form>
          <div className={s.footer}>
            <p className={s.footerLabel}>Or Sign in Using</p>
            <Link to='/login' className={s.signup}>
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singup
