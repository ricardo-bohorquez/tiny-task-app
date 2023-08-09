import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import icon from '../icons/list-check-solid-light.svg'
import { Link, useLocation } from 'react-router-dom'

export function Header () {
  const { user, logOut } = useAuth()
  const location = useLocation()
  const [displayLogin, setDisplayLogin] = useState(false)
  const [displayRegister, setDisplayRegister] = useState(false)

  useEffect(() => {
    if (location.pathname === '/tiny-task-app/login') {
      setDisplayLogin(false)
      setDisplayRegister(true)
    } else {
      setDisplayLogin(true)
      setDisplayRegister(false)
    }
  })

  useEffect(() => {
    if (
      location.pathname === '/tiny-task-app/register' ||
      location.pathname === '/tiny-task-app/dashboard' ||
      location.pathname === '/tiny-task-app/'
    ) {
      setDisplayRegister(false)
      setDisplayLogin(true)
    } else {
      setDisplayRegister(true)
      setDisplayLogin(false)
    }
  })

  const handleLogout = async () => await logOut()

  return !user ? (
    <header className='app-header'>
      <section>
        <img src={icon} />
        <h1>Tiny Task</h1>
        <div>
          {!displayLogin && displayRegister ? (
            <Link to={'/tiny-task-app/register'} style={{ color: 'white' }}>
              Registrate
            </Link>
          ) : (
            <Link to={'/tiny-task-app/login'} style={{ color: 'white' }}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </section>
    </header>
  ) : (
    <header className='app-header'>
      <section>
        <img src={icon} />
        <h1>Tiny Task</h1>
        <div>
          <Link
            to={'/tiny-task-app/login'}
            style={{ color: '#925252' }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Link>
        </div>
      </section>
      <label>{user.email}</label>
    </header>
  )
}
