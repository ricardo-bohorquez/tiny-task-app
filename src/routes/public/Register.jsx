import { useState } from 'react'
import { Redirect } from 'wouter'
import { doc } from 'firebase/firestore'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useForm } from 'react-hook-form'

import { db } from '@/config/configFirebase'
import { useAuth } from '@/context/AuthContext'
import userRegistrySchema from '@/schemas/userRegistry.schema'
import ModalLoader from '@/components/modals/ModalLoader'
import ModalError from '@/components/modals/ModalError'
import { ERROR_STRING, ERROR_TEXT_LABEL } from '@/constants/errorsConstants'
import { MODAL_TYPE } from '@/constants/modalsConstants'
import { LOGIN_FORM_STRING } from '@/constants/loginConstants'
import { HEADER_STRING } from '@/constants/headerConstants'

dayjs.extend(customParseFormat)
dayjs.locale('es')

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
    try {
      const { setDoc } = await import('firebase/firestore')
      const userData = {
        loginWithGoogle: false,
        email: '',
        accountCreationDate: dayjs().format('DD/MM/YYYY'),
        listOfTask: {
          pending: [],
          performed: []
        }
      }
      const { user: { uid, email } } = await signUp(mail, pass)
      await setDoc(doc(db, 'users', uid), { ...userData, email })
      setViewModal(resetModalProps)
      setErrorEmail({ border: 'none' })
      setErrorPass({ border: 'none' })
    } catch (error) {
      if (error.code === `auth/${EMAIL_IN_USE}`) {
        setViewModal(resetModalProps)
        setErrorEmail({ border: '1px solid red' })
        setViewModal({ ...viewModal, state: true, type: EMAIL_IN_USE })
      } else console.log(error)
    }
  }

  return user
    ? <Redirect to='/dashboard' />
    : (
      <main>
        <section className='title-login-register'>
          <h2 style={{ height: 'fit-content', margin: '0 0 1rem' }}>{SING_UP}</h2>
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
