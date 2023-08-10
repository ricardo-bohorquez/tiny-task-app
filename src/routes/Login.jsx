import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import ModalLoginError from '../components/modals/ModalLoginError'
import google from '../icons/google.svg'

export function Login () {
  const { signIn, viewModal, setViewModal, user, googleLogin } = useAuth()

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

  const handleGoogleLogin = async () => {
    const { _tokenResponse } = await googleLogin()
    if (_tokenResponse.isNewUser) console.log(_tokenResponse.isNewUser)
    else console.log(_tokenResponse)
  }

  return user ? (
    <Navigate to='/tiny-task-app/dashboard' />
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
          maxLength={30}
        />
        {displayLabel ? <label>Contraseña incorrecta</label> : <></>}
        <button>Ingresar</button>
        {viewModal.state && viewModal.type === 'user-not-found' ? (
          <ModalLoginError />
        ) : (
          <></>
        )}
      </form>
      <label> ó puedes </label>
      <button className='login-google-button' onClick={handleGoogleLogin}>
        Iniciar sesión con <img src={google} />
      </button>
    </main>
  )
}
