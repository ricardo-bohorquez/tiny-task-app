import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { db } from '../../configFirebase'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import userRegistrySchema from '../schemas/userRegistry.schema'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

function Register () {
  const { signUp, resetModalProps, viewModal, setViewModal, user } = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { mail, confirmMail, password, confirmPassword } = userRegistrySchema
  const [inUse, setInUse] = useState(false)

  const userData = {
    loginWithGoogle: false,
    email: '',
    accountCreationDate: dayjs().format('DD/MM/YYYY'),
    listOfTask: {
      pending: [],
      performed: []
    }
  }

  const handleRegister = async (mail, pass) => {
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    const { setDoc } = await import('firebase/firestore')
    try {
      const { user: { uid, email } } = await signUp(mail, pass)
      await setDoc(doc(db, 'users', uid), { ...userData, email })
      setViewModal(resetModalProps)
    } catch ({ code }) {
      setViewModal(resetModalProps)
      code === 'auth/email-already-in-use' &&
        setInUse(true)
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
            {...register('mail', mail)}
            onBlur={() => setInUse(false)}
          />
          {errors.mail &&
            <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
          {inUse &&
            <span className='text-white span-error-taskform'>El correo ya se encuentra en uso</span>}
          <input
            type='email'
            placeholder='Repita el correo ingresado'
            {...register('confirmMail',
              {
                ...confirmMail,
                validate: (value) => value === watch('mail') || 'Los correos deben coincidir'
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
            {...register('confirmPassword',
              {
                ...confirmPassword,
                validate: (value) => value === watch('password') || 'Las contraseñas deben coincidir'
              })}
          />
          {errors.confirmPassword &&
            <span className='text-white span-error-taskform'>{errors.confirmPassword.message}</span>}
          <button>Registrarse</button>
        </form>
      </main>
      )
}

export default Register
