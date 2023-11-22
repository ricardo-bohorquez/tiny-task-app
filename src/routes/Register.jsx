import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { db } from '../../configFirebase'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import userRegistrySchema from '../schemas/userRegistry.schema'
import ModalLoader from '../components/modals/ModalLoader'
import ModalError from '../components/modals/ModalError'

function Register () {
  const { signUp, resetModalProps, viewModal, setViewModal, user } = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { mail, confirmMail, password, confirmPassword } = userRegistrySchema
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})

  const handleRegister = async (mail, pass) => {
    setViewModal({ ...viewModal, state: true, type: 'loader' })
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
      code === 'auth/email-already-in-use' &&
      setErrorEmail({ border: '1px solid red' })
      setViewModal({ ...viewModal, state: true, type: 'email-in-use' })
    }
  }

  return user
    ? <Navigate to='/dashboard' />
    : (
      <main>
        <section className='title-login-register'>
          <h2 style={{ height: 'fit-content', margin: 'auto' }}>Registrate</h2>
        </section>
        <form
          className='register-form'
          onSubmit={handleSubmit(({ mail, password }) => {
            handleRegister(mail, password)
          })}
        >
          <input
            type='email'
            placeholder='Ingrese su correo de registro '
            autoComplete='off'
            {...register('mail', mail)}
          />
          {errors.mail &&
            <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
          <input
            type='email'
            placeholder='Repita el correo ingresado'
            autoComplete='off'
            style={errorEmail}
            onFocus={() => setErrorEmail({ border: 'none' })}
            {...register('confirmMail',
              {
                ...confirmMail,
                validate: function (value) {
                  if (value === watch('mail')) return {}
                  else {
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
            placeholder='Ingrese su clave de acceso'
            {...register('password', password)}
          />
          {errors.password &&
            <span className='text-white span-error-taskform'>{errors.password.message}</span>}
          <input
            type='password'
            placeholder='Repita la clave ingresada'
            style={errorPass}
            onFocus={() => setErrorEmail({ border: 'none' })}
            {...register('confirmPassword',
              {
                ...confirmPassword,
                validate: function (value) {
                  if (value === watch('password')) return {}
                  else {
                    setErrorPass({ border: '1px solid red' })
                    return 'Las contraseñas deben coincidir'
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
        {viewModal.state && viewModal.type === 'email-in-use'
          ? <ModalError type={viewModal.type} />
          : <></>}
      </main>
      )
}

export default Register
