import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'wouter'
import { useForm } from 'react-hook-form'

import userResetPass from '@/schemas/userResetPass.schema'

import ModalLoader from '@/components/modals/ModalLoader'
import ModalSuccessResetPass from '@/components/modals/ModalSuccessResetPass'

function RecoverPassword () {
  const { recoverPassword, setViewModal, viewModal, user } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { emailToResetPass } = userResetPass

  const SUCCESS_RESET = 'success-reset'

  const handleRecoverPassword = async email => {
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    try {
      await recoverPassword(email)
      setViewModal({ ...viewModal, state: true, type: SUCCESS_RESET })
    } catch (error) {
      console.error(error)
    }
  }

  return user
    ? <Redirect to='/dashboard' />
    : (
      <main className='main-recover-pass'>
        <section className='title-login-register-recover'>
          <h2 style={{ height: 'fit-content', margin: '0 0 1rem' }}>Recuperar contraseña</h2>
        </section>
        <form
          className='recover-pass-form' onSubmit={handleSubmit(({ emailToResetPass }) => {
            handleRecoverPassword(emailToResetPass)
          })}
        >
          <input
            type='email'
            placeholder='Correo electrónico'
            autoComplete='off'
            {...register('emailToResetPass', emailToResetPass)}
          />
          {errors.emailToResetPass &&
            <span className='text-white span-error-taskform'>{errors.emailToResetPass.message}</span>}
          <button>Reestablecer</button>
          {viewModal.state && viewModal.type === 'loader'
            ? <ModalLoader />
            : <></>}
          {viewModal.state && viewModal.type === SUCCESS_RESET
            ? <ModalSuccessResetPass />
            : <></>}
        </form>
      </main>
      )
}

export default RecoverPassword
