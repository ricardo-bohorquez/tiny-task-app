import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { doc } from 'firebase/firestore'
import { db } from '../../configFirebase'
import ModalError from '../components/modals/ModalError'
import ModalLoader from '../components/modals/ModalLoader'
import google from '../icons/google.svg'

function Login () {
  const {
    signIn,
    viewModal,
    setViewModal,
    resetModalProps,
    user,
    googleLogin
  } = useAuth()

  const [userEmail, setUserEmail] = useState('')
  const [userPass, setUserPass] = useState('')
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const [displayLabel, setDisplayLabel] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    try {
      await signIn(userEmail, userPass)
      setViewModal(resetModalProps)
    } catch ({ code }) {
      if (code === 'auth/user-not-found') {
        setViewModal(resetModalProps)
        setDisplayLabel(false)
        setErrorPass({ border: 'none' })
        setViewModal({ ...viewModal, state: true, type: 'user-not-found' })
        setErrorEmail({ border: '1px solid red' })
      }
      if (code === 'auth/wrong-password') {
        setViewModal(resetModalProps)
        setErrorEmail({ border: 'none' })
        setDisplayLabel(true)
        setErrorPass({ border: '1px solid red' })
      }
    }
  }

  const newData = {
    loginWithGoogle: true,
    displayName: '',
    accountCreationDate: '',
    listOfTask: {
      pending: [],
      performed: []
    }
  }

  const handleGoogleLogin = async () => {
    const {
      user: { uid, displayName }
    } = await googleLogin()
    const { getDoc, setDoc } = await import('firebase/firestore')
    const dayjs = await import('dayjs')
    const customParseFormat = await import('dayjs/plugin/customParseFormat.js')
    dayjs.extend(customParseFormat)
    dayjs.locale('es')
    const accountCreationDate = dayjs.default().format('DD/MM/YYYY')
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return {}
    else await setDoc(docRef, { ...newData, displayName, accountCreationDate })
  }

  return user
    ? (
      <Navigate to='/dashboard' />
      )
    : (
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
          <label>
            ¿Olvidaste tu contraseña?{' '}
            <Link to='/password-recovery'>Recupérala aquí.</Link>
          </label>
          <button>Ingresar</button>
          {viewModal.state && viewModal.type === 'loader'
            ? <ModalLoader />
            : <></>}
          {viewModal.state && viewModal.type === 'user-not-found'
            ? <ModalError type='user-not-found' />
            : <></>}
        </form>
        <label> ó puedes </label>
        <button className='login-google-button' onClick={handleGoogleLogin}>
          Iniciar sesión con <img src={google} />
        </button>
      </main>
      )
}

export default Login
