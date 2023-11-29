import icon from '../icons/list-check-solid-light.svg'
import gears from '../icons/gears-solid.svg'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HEADER_STRING } from '../constants/headerConstants'

function Header () {
  const { user, logOut } = useAuth()
  const location = useLocation()
  const [displayLogin, setDisplayLogin] = useState(false)
  const [displayRegister, setDisplayRegister] = useState(false)
  const { APP_NAME, LOG_OUT, SING_IN, SING_UP } = HEADER_STRING

  useEffect(() => {
    if (location.pathname === '/login') {
      setDisplayLogin(false)
      setDisplayRegister(true)
    } else {
      setDisplayLogin(true)
      setDisplayRegister(false)
    }
  })

  useEffect(() => {
    if (
      location.pathname === '/register' ||
      location.pathname === '/'
    ) {
      setDisplayRegister(false)
      setDisplayLogin(true)
    } else {
      setDisplayRegister(true)
      setDisplayLogin(false)
    }
  })

  const handleLogout = async () => await logOut()

  return !user
    ? (
      <header className='app-header'>
        <section>
          <img src={icon} />
          <Link to='/'>
            <h1>{APP_NAME}</h1>
          </Link>
          <div>
            {!displayLogin && displayRegister
              ? <Link to='/register' className='text-white'>{SING_UP}</Link>
              : <Link to='/login' className='text-white'>{SING_IN}</Link>}
          </div>
        </section>
      </header>
      )
    : (
      <header className='app-header'>
        <section>
          <Link to='/dashboard' className='dashboard-link'>
            <img src={icon} className='dashboard-link-ico' />
          </Link>
          <h1>
            <Link to='/'>{APP_NAME}</Link>
          </h1>
          <div>
            <Link
              to='/login'
              onClick={handleLogout}
            >
              {LOG_OUT}
            </Link>
          </div>
        </section>
        <section>
          <label>{user.displayName || user.email}</label>
          <Link to='/settings' className='settings-link'>
            <img src={gears} className='settings-link-ico' />
          </Link>
        </section>
      </header>
      )
}

export default Header
