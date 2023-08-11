import { FC, useState, ChangeEventHandler } from 'react'
import s from './Login.module.css'
import { CiUser as UserIcon, CiLock as LockIcon } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {}

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = e => {
    setEmail(e.target.value)
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
                name='email'
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Type your username'
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
                name='password'
                type='password'
                className={s.input}
                value={password}
                onChange={handlePasswordChange}
                placeholder='Type your password'
              />
            </div>
            <input className={s.submit} type='submit' value='Login' />
          </form>
          <div className={s.footer}>
            <p className={s.footerLabel}>Or Sign Up Using</p>
            <Link to='/' className={s.signup}>
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
