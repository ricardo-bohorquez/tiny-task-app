import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ModalLoginError from '../components/modals/ModalLoginError'
import AreLogged from '../components/AreLoged'

export function Login () {
  const { signIn, viewModal, setViewModal, user } = useAuth()

  const [userEmail, setUserEmail] = useState('')
  const [userPass, setUserPass] = useState('')
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const [displayLabel, setDisplayLabel] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      await signIn(userEmail, userPass)
      navigate('/tiny-task-app/dashboard')
    } catch ({ code }) {
      if (code === 'auth/user-not-found') {
        setDisplayLabel(false)
        setErrorPass({ border: 'none' })
        setViewModal({ ...viewModal, state: true, type: 'user-not-found' })
        setErrorEmail({ border: '1px solid red' })
      }
      if (code === 'auth/wrong-password') {
        setErrorEmail({ border: 'none' })
        setDisplayLabel(true)
        setErrorPass({ border: '1px solid red' })
      }
    }
  }

  return user ? (
    <AreLogged />
  ) : (
    <main>
      <section className='title-login-register'>
        <h2 style={{ height: 'fit-content', margin: 'auto' }}>Inicia sesión</h2>
      </section>
      <form onSubmit={handleLogin} className='login-form'>
        <input
          type='email'
          onChange={({ target: { value } }) => setUserEmail(value)}
          value={userEmail}
          style={errorEmail}
          onFocus={() => setErrorEmail({ border: 'none' })}
          required
          placeholder='Correo electrónico'
        />
        <input
          type='password'
          onChange={({ target: { value } }) => setUserPass(value)}
          value={userPass}
          style={errorPass}
          placeholder='Contraseña'
          required
          minLength={6}
          maxLength={6}
        />
        {displayLabel ? <label>Contraseña incorrecta</label> : <></>}
        <button>Ingresar</button>
        {viewModal.state && viewModal.type === 'user-not-found' ? (
          <ModalLoginError />
        ) : (
          <></>
        )}
      </form>
    </main>
  )
}
