import { useState, ChangeEventHandler, FormEventHandler } from 'react'
import s from './Login.module.css'
import { CiUser as UserIcon, CiLock as LockIcon } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import { login } from '../api/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const { sendRequest } = useRequest(
    login,
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
    sendRequest({ email, password })
  }

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = e => {
    setEmail(e.target.value.trim())
  }

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value)
  }

  return (
    <div className={s.container}>
      <div className={s.box}>
        <div className={s.inner}>
          <div className={s.header}>
            <p className={s.title}>Login</p>
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
                className={s.input}
                id='email'
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
                maxLength={15}
                minLength={6}
                className={s.input}
                value={password}
                onChange={handlePasswordChange}
                placeholder='Type your password'
                required
              />
            </div>

            <p className={s.error}>{error}</p>
            <input className={s.submit} type='submit' value='Login' />
          </form>
          <div className={s.footer}>
            <p className={s.footerLabel}>Or Sign Up Using</p>
            <Link to='/signup' className={s.signup}>
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
