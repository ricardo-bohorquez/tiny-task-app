import { useState } from 'react'
import { Redirect } from 'wouter'
import { doc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { db } from '@/config/configFirebase'
import { useAuth } from '@/context/AuthContext'

import userRegistrySchema from '@/schemas/userRegistry.schema'

import ModalLoader from '@/components/modals/ModalLoader'
import ModalError from '@/components/modals/ModalError'

dayjs.extend(customParseFormat)
dayjs.locale('es')

function Register () {
  const { signUp, resetModalProps, viewModal, setViewModal, user } = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const { mail, confirmMail, password, confirmPassword } = userRegistrySchema

  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})

  const EMAIL_IN_USE = 'email-already-in-use'

  const handleRegister = async (mail, pass) => {
    setViewModal({ ...viewModal, state: true, type: 'loader' })
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
        setViewModal({ ...viewModal, state: true, type: EMAIL_IN_USE })
        setErrorEmail({ border: '1px solid red' })
      } else console.error(error)
    }
  }

  return user
    ? <Redirect to='/dashboard' />
    : (
      <main>
        <section className='title-login-register-recover'>
          <h2 style={{ height: 'fit-content', margin: '0 0 1rem' }}>Registrarse</h2>
        </section>
        <form
          className='register-form'
          onSubmit={handleSubmit(({ mail, password }) => {
            handleRegister(mail, password)
          })}
        >
          <input
            type='email'
            placeholder='Correo electrónico'
            autoComplete='off'
            {...register('mail', mail)}
          />
          {errors.mail &&
            <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
          <input
            type='email'
            placeholder='Confirme correo electrónico'
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
                    return 'Los correos deben coincidir'
                  }
                }
              })}
          />
          {errors.confirmMail &&
            <span className='text-white span-error-taskform'>{errors.confirmMail.message}</span>}
          <input
            type='password'
            placeholder='Contraseña'
            {...register('password', password)}
          />
          {errors.password &&
            <span className='text-white span-error-taskform'>{errors.password.message}</span>}
          <input
            type='password'
            placeholder='Confirme contraseña'
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
                    return 'Las constraseñas deben coincidir'
                  }
                }
              })}
          />
          {errors.confirmPassword &&
            <span className='text-white span-error-taskform'>{errors.confirmPassword.message}</span>}
          <button>Registrarse</button>
        </form>
        {viewModal.state && viewModal.type === 'loader'
          ? <ModalLoader />
          : <></>}
        {viewModal.state && viewModal.type === EMAIL_IN_USE
          ? <ModalError type={viewModal.type} />
          : <></>}
      </main>
      )
}

export default Register
