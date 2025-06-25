import { useState } from 'react'
import { Redirect, Link } from 'wouter'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { doc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'

import { db } from '@/config/configFirebase'
import { useAuth } from '@/context/AuthContext'
import userLoginSchema from '@/schemas/userLogin.schema'
import ModalError from '@/components/modals/ModalError'
import ModalLoader from '@/components/modals/ModalLoader'
import google from '@/icons/google.svg'

dayjs.extend(customParseFormat)
dayjs.locale('es')

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

  const INVALID_CREDENTIAL = 'invalid-credential'

  const handleLogin = async (email, pass) => {
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    try {
      await signIn(email, pass)
      setViewModal(resetModalProps)
    } catch (error) {
      if (error.code === `auth/${INVALID_CREDENTIAL}`) {
        setViewModal(resetModalProps)
        setViewModal({ ...viewModal, state: true, type: INVALID_CREDENTIAL })
        setErrorPass({ border: '1px solid red' })
        setErrorEmail({ border: '1px solid red' })
      } else console.error(error)
    }
  }

  const handleGoogleLogin = async () => {
    const {
      user: { uid, displayName }
    } = await googleLogin()
    const { getDoc, setDoc } = await import('firebase/firestore')
    const accountCreationDate = dayjs().format('DD/MM/YYYY')
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
      <Redirect to='/dashboard' />
      )
    : (
      <main>
        <section className='title-login-register-recover'>
          <h2 style={{ height: 'fit-content', margin: '0 0 1rem' }}>Iniciar sesión</h2>
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
          {errors.password &&
            <span className='text-white span-error-taskform'>{errors.password.message}</span>}
          <label>
            ¿Olvidaste tu contraseña?
            <Link href='/password-recovery'> Recuperala aquí</Link>
          </label>
          <button>Ingresar</button>
          {viewModal.state && viewModal.type === 'loader'
            ? <ModalLoader />
            : <></>}
          {viewModal.state && viewModal.type === INVALID_CREDENTIAL
            ? <ModalError type={INVALID_CREDENTIAL} />
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
