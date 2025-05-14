import icon from '@/icons/list-check-solid-light.svg'
import gears from '@/icons/gears-solid.svg'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '@/context/AuthContext'
import { HEADER_STRING } from '@/constants/headerConstants'

function Header () {
  const { user, logOut } = useAuth()
  const [location] = useLocation()
  const [displayLogin, setDisplayLogin] = useState(false)
  const [displayRegister, setDisplayRegister] = useState(false)
  const { APP_NAME, LOG_OUT, SING_IN, SING_UP } = HEADER_STRING

  useEffect(() => {
    if (location === '/login') {
      setDisplayLogin(false)
      setDisplayRegister(true)
    } else {
      setDisplayLogin(true)
      setDisplayRegister(false)
    }
  })

  useEffect(() => {
    if (
      location === '/register' ||
      location === '/'
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
          <div>
            <img src={icon} className='app-logo' />
          </div>
          <h1>
            <Link href='/'>{APP_NAME}</Link>
          </h1>
          <div>
            {!displayLogin && displayRegister
              ? <Link href='/register' className='text-white'>{SING_UP}</Link>
              : <Link href='/login' className='text-white'>{SING_IN}</Link>}
          </div>
        </section>
      </header>
      )
    : (
      <header className='app-header'>
        <section>
          <Link href='/dashboard' className='dashboard-link'>
            <img src={icon} className='dashboard-link-ico' />
          </Link>
          <h1>
            <Link href='/'>{APP_NAME}</Link>
          </h1>
          <div>
            <Link
              href='/login'
              onClick={handleLogout}
            >
              {LOG_OUT}
            </Link>
          </div>
        </section>
        <section>
          <label>{user.displayName || user.email}</label>
          <Link href='/settings' className='settings-link'>
            <img src={gears} className='settings-link-ico' />
          </Link>
        </section>
      </header>
      )
}

export default Header
