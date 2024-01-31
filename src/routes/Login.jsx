import { useState } from 'react'
import { Redirect, Link } from 'wouter'
import { doc } from 'firebase/firestore'
import { db } from '../../configFirebase'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import userLoginSchema from '../schemas/userLogin.schema'
import ModalError from '../components/modals/ModalError'
import ModalLoader from '../components/modals/ModalLoader'
import google from '../icons/google.svg'
import { ERROR_STRING } from '../constants/errorsConstants'
import { MODAL_TYPE } from '../constants/modalsConstants'
import { LOGIN_STRING, LOGIN_FORM_STRING } from '../constants/loginConstants'
import { HEADER_STRING } from '../constants/headerConstants'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
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
  const { USER_NOT_FOUND, WRONG_PASSWORD } = ERROR_STRING
  const { TYPE_LOADER } = MODAL_TYPE
  const { GOOGLE_LOGIN, OPTION_TEXT } = LOGIN_STRING
  const { EMAIL_PLACEHOLDER, PASS_PLACEHOLDER, ENTRY, WRONG, LOST_PASS, RECOVER_HERE } = LOGIN_FORM_STRING
  const { SING_IN } = HEADER_STRING
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const [displayLabel, setDisplayLabel] = useState(false)

  const handleLogin = async (email, pass) => {
    setViewModal({ ...viewModal, state: true, type: TYPE_LOADER })
    try {
      await signIn(email, pass)
      setViewModal(resetModalProps)
    } catch ({ code }) {
      if (code === `auth/${USER_NOT_FOUND}`) {
        setViewModal(resetModalProps)
        setDisplayLabel(false)
        setErrorPass({ border: 'none' })
        setViewModal({ ...viewModal, state: true, type: USER_NOT_FOUND })
        setErrorEmail({ border: '1px solid red' })
      }
      if (code === `auth/${WRONG_PASSWORD}`) {
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
        <section className='title-login-register'>
          <h2 style={{ height: 'fit-content', margin: 'auto' }}>{SING_IN}</h2>
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
            placeholder={EMAIL_PLACEHOLDER}
            {...register('mail', mail)}
          />
          {errors.mail &&
            <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
          <input
            type='password'
            style={errorPass}
            onFocus={() => setErrorPass({ border: 'none' })}
            placeholder={PASS_PLACEHOLDER}
            {...register('password', password)}
          />
          {displayLabel ? <label className='text-white span-error-taskform'>{WRONG}</label> : <></>}
          <label>
            {LOST_PASS}
            <Link href='/password-recovery'>{RECOVER_HERE}</Link>
          </label>
          <button>{ENTRY}</button>
          {viewModal.state && viewModal.type === TYPE_LOADER
            ? <ModalLoader />
            : <></>}
          {viewModal.state && viewModal.type === USER_NOT_FOUND
            ? <ModalError type={USER_NOT_FOUND} />
            : <></>}
        </form>
        <label>{OPTION_TEXT}</label>
        <button className='login-google-button' onClick={handleGoogleLogin}>
          {GOOGLE_LOGIN}<img src={google} />
        </button>
      </main>
      )
}

export default Login
