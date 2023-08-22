import s from './SidebarAlter.module.css'

const SidebarAlter = () => {
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.text}>
          You can find other conversations using search panel
        </div>
        <div className={s.text}>
          Or you can create a new conversation in settings
        </div>
      </div>
    </div>
  )
}

export default SidebarAlter
