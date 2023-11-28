import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { db } from '../../configFirebase'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import userRegistrySchema from '../schemas/userRegistry.schema'
import ModalLoader from '../components/modals/ModalLoader'
import ModalError from '../components/modals/ModalError'
import { ERROR_STRING, ERROR_TEXT_LABEL } from '../constants/errorsConstants'
import { MODAL_TYPE } from '../constants/modalsConstants'
import { LOGIN_FORM_STRING } from '../constants/loginConstants'
import { HEADER_STRING } from '../constants/headerConstants'

function Register () {
  const { signUp, resetModalProps, viewModal, setViewModal, user } = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { mail, confirmMail, password, confirmPassword } = userRegistrySchema
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const { EMAIL_IN_USE } = ERROR_STRING
  const { EMAIL_NOT_MATCH, PASS_NOT_MATCH } = ERROR_TEXT_LABEL
  const { TYPE_LOADER } = MODAL_TYPE
  const { EMAIL_PLACEHOLDER, EMAIL_CONFIRM_PLACEHOLDER, PASS_PLACEHOLDER, PASS_CONFIRM_PLACEHOLDER, REGISTER } = LOGIN_FORM_STRING
  const { SING_UP } = HEADER_STRING

  const handleRegister = async (mail, pass) => {
    setViewModal({ ...viewModal, state: true, type: TYPE_LOADER })
    const { setDoc } = await import('firebase/firestore')
    const dayjs = await import('dayjs')
    const customParseFormat = await import('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)
    dayjs.locale('es')
    const userData = {
      loginWithGoogle: false,
      email: '',
      accountCreationDate: dayjs.default().format('DD/MM/YYYY'),
      listOfTask: {
        pending: [],
        performed: []
      }
    }
    try {
      const { user: { uid, email } } = await signUp(mail, pass)
      await setDoc(doc(db, 'users', uid), { ...userData, email })
      setViewModal(resetModalProps)
      setErrorEmail({ border: 'none' })
      setErrorPass({ border: 'none' })
    } catch ({ code }) {
      setViewModal(resetModalProps)
      code === `auth/${EMAIL_IN_USE}` &&
      setErrorEmail({ border: '1px solid red' })
      setViewModal({ ...viewModal, state: true, type: EMAIL_IN_USE })
    }
  }

  return user
    ? <Navigate to='/dashboard' />
    : (
      <main>
        <section className='title-login-register'>
          <h2 style={{ height: 'fit-content', margin: 'auto' }}>{SING_UP}</h2>
        </section>
        <form
          className='register-form'
          onSubmit={handleSubmit(({ mail, password }) => {
            handleRegister(mail, password)
          })}
        >
          <input
            type='email'
            placeholder={EMAIL_PLACEHOLDER}
            autoComplete='off'
            {...register('mail', mail)}
          />
          {errors.mail &&
            <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
          <input
            type='email'
            placeholder={EMAIL_CONFIRM_PLACEHOLDER}
            autoComplete='off'
            style={errorEmail}
            {...register('confirmMail',
              {
                ...confirmMail,
                validate: function (value) {
                  if (value === watch('mail')) {
                    setErrorEmail({ border: 'none' })
                    return {}
                  } else {
                    setErrorEmail({ border: '1px solid red' })
                    return EMAIL_NOT_MATCH
                  }
                }
              })}
          />
          {errors.confirmMail &&
            <span className='text-white span-error-taskform'>{errors.confirmMail.message}</span>}
          <input
            type='password'
            placeholder={PASS_PLACEHOLDER}
            {...register('password', password)}
          />
          {errors.password &&
            <span className='text-white span-error-taskform'>{errors.password.message}</span>}
          <input
            type='password'
            placeholder={PASS_CONFIRM_PLACEHOLDER}
            style={errorPass}
            {...register('confirmPassword',
              {
                ...confirmPassword,
                validate: function (value) {
                  if (value === watch('password')) {
                    setErrorPass({ border: 'none' })
                    return {}
                  } else {
                    setErrorPass({ border: '1px solid red' })
                    return PASS_NOT_MATCH
                  }
                }
              })}
          />
          {errors.confirmPassword &&
            <span className='text-white span-error-taskform'>{errors.confirmPassword.message}</span>}
          <button>{REGISTER}</button>
        </form>
        {viewModal.state && viewModal.type === TYPE_LOADER
          ? <ModalLoader />
          : <></>}
        {viewModal.state && viewModal.type === EMAIL_IN_USE
          ? <ModalError type={viewModal.type} />
          : <></>}
      </main>
      )
}

export default Register
