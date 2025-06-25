import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'

import userLoginSchema from '@/schemas/userLogin.schema'

function ConfigEmail () {
  const {
    changeEmail,
    user: {
      email
    }
  } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { mail } = userLoginSchema

  const [errorEmail, setErrorEmail] = useState({})

  const handleChange = async (newEmail) => {
    await changeEmail(newEmail)
  }

  return (
    <section className='section-chg-em'>
      <p className='title-change'>Tu correo actual es:</p>
      <p className='title-change'>{email}</p>
      <form
        onSubmit={handleSubmit(({ mail }) => {
          handleChange(mail)
        })} className='change-email-form'
      >
        <input
          type='email'
          style={errorEmail}
          onFocus={() => setErrorEmail({ border: 'none' })}
          placeholder='Nuevo correo electrónico'
          autoComplete='off'
          {...register('mail', mail)}
        />
        {errors.mail &&
          <span className='text-white span-error-taskform'>{errors.mail.message}</span>}
        <button>Cambiar</button>
      </form>
    </section>
  )
}

export default ConfigEmail
