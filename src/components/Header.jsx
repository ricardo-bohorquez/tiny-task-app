import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import icon from '../icons/list-check-solid-light.svg'
import { Link, useLocation } from 'react-router-dom'
import { Login } from '../routes/Login'

export function Header () {
  const { user, logOut } = useAuth()
  const location = useLocation()
  const [displayLogin, setDisplayLogin] = useState(false)

  useEffect(() => {
    if (location.pathname === '/tiny-task-app/login') setDisplayLogin(false)
    else setDisplayLogin(true)
  })

  const handleLogout = async () => await logOut()

  return (
    <header className='app-header'>
      <section>
        <img src={icon} />
        <h1>NoTask</h1>
        {!user ? (
          <div>
            {displayLogin ? (
              <Link to={'/tiny-task-app/login'} style={{ fontSize: '15px' }}>
                Iniciar sesión
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <>
            {displayLogin ? (
              <Link
                to={'/tiny-task-app/login'}
                onClick={handleLogout}
                style={{ fontSize: '15px' }}
              >
                Cerrar Sesión
              </Link>
            ) : (
              <div></div>
            )}
          </>
        )}
      </section>
      {user ? (
        <>{!displayLogin ? <></> : <label>{user.email}</label>}</>
      ) : (
        <></>
      )}
    </header>
  )
}

{
  /* <Link to={'/tiny-task-app/login'} style={{ fontSize: '15px' }}>
  Login
</Link> */
}
