import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { db } from '../../configFirebase'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import userLoginSchema from '../schemas/userLogin.schema'
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

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { mail, password } = userLoginSchema
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const [displayLabel, setDisplayLabel] = useState(false)

  const handleLogin = async (email, pass) => {
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    try {
      await signIn(email, pass)
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
    const newData = {
      loginWithGoogle: true,
      displayName: '',
      accountCreationDate,
      listOfTask: {
        pending: [],
        performed: []
      }
    }
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return {}
    else await setDoc(docRef, { ...newData, displayName })
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
        <form
          onSubmit={handleSubmit(({ mail, password }) => {
            handleLogin(mail, password)
          })} className='login-form'
        >
          <input
            type='email'
            style={errorEmail}
            onFocus={() => setErrorEmail({ border: 'none' })}
            placeholder='Correo electrónico'
            {...register('mail', mail)}
          />
          {errors.mail &&
            <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
          <input
            type='password'
            style={errorPass}
            onFocus={() => setErrorPass({ border: 'none' })}
            placeholder='Contraseña'
            {...register('password', password)}
          />
          {displayLabel ? <label className='text-white span-error-taskform'>Contraseña incorrecta</label> : <></>}
          <label>
            ¿Olvidaste tu contraseña?{'  '}
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
