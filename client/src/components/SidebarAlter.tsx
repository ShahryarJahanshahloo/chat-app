import s from './SidebarAlter.module.css'

const SidebarAlter = () => {
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.text}>You can find other conversations from here</div>
        <div className={s.text}>
          Or you can create a new conversation from here
        </div>
      </div>
    </div>
  )
}

export default SidebarAlter
