import { useAuth } from '../context/AuthContext'
import { Redirect } from 'wouter'
import { useForm } from 'react-hook-form'
import userResetPass from '../schemas/userResetPass.schema'
import ModalError from '../components/modals/ModalError'
import ModalSuccessResetPass from '../components/modals/ModalSuccessResetPass'
import ModalLoader from '../components/modals/ModalLoader'
import { MODAL_TYPE } from '../constants/modalsConstants'
import { ERROR_STRING } from '../constants/errorsConstants'
import { LOGIN_FORM_STRING } from '../constants/loginConstants'

function RecoverPassword () {
  const { recoverPassword, setViewModal, viewModal, user } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { emailToResetPass } = userResetPass
  const { TYPE_SUCCESS_RESET, TYPE_LOADER } = MODAL_TYPE
  const { USER_NOT_FOUND } = ERROR_STRING
  const { EMAIL_PLACEHOLDER, RESET } = LOGIN_FORM_STRING

  const handleRecoverPassword = async email => {
    setViewModal({ ...viewModal, state: true, type: TYPE_LOADER })
    try {
      await recoverPassword(email)
      setViewModal({ ...viewModal, state: true, type: TYPE_SUCCESS_RESET })
    } catch ({ code }) {
      if (code === `auth/${USER_NOT_FOUND}`) { setViewModal({ ...viewModal, state: true, type: USER_NOT_FOUND }) }
    }
  }

  return user
    ? <Redirect to='/tiny-task-app/dashboard' />
    : (
      <main>
        <form
          className='recover-pass-form' onSubmit={handleSubmit(({ emailToResetPass }) => {
            handleRecoverPassword(emailToResetPass)
          })}
        >
          <input
            type='email'
            placeholder={EMAIL_PLACEHOLDER}
            autoComplete='off'
            {...register('emailToResetPass', emailToResetPass)}
          />
          {errors.emailToResetPass &&
            <span className='text-white span-error-taskform'>{errors.emailToResetPass.message}</span>}
          <button>{RESET}</button>
          {viewModal.state && viewModal.type === TYPE_LOADER
            ? <ModalLoader />
            : <></>}
          {viewModal.state && viewModal.type === USER_NOT_FOUND
            ? <ModalError type={USER_NOT_FOUND} />
            : <></>}
          {viewModal.state && viewModal.type === TYPE_SUCCESS_RESET
            ? <ModalSuccessResetPass />
            : <></>}
        </form>
      </main>
      )
}

export default RecoverPassword
