import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import ModalError from '../components/modals/ModalError'
import ModalSuccessResetPass from '../components/modals/ModalSuccessResetPass'
import ModalLoader from '../components/modals/ModalLoader'

function RecoverPassword () {
  const { recoverPassword, setViewModal, viewModal, user } = useAuth()
  const [emailToRecoverPass, setEmailToRecoverPass] = useState('')

  const handleRecoverPassword = async e => {
    e.preventDefault()
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    try {
      await recoverPassword(emailToRecoverPass)
      setViewModal({ ...viewModal, state: true, type: 'success-reset' })
    } catch ({ code }) {
      if (code === 'auth/user-not-found') { setViewModal({ ...viewModal, state: true, type: 'user-not-found' }) }
    }
  }

  return user
    ? <Navigate to='/dashboard' />
    : (
      <main>
        <form className='recover-pass-form' onSubmit={handleRecoverPassword}>
          <input
            type='email'
            value={emailToRecoverPass}
            onChange={({ target: { value } }) => setEmailToRecoverPass(value)}
            placeholder='Ingrese su correo'
            required
          />
          <button>Reestablecer</button>
          {viewModal.state && viewModal.type === 'loader'
            ? <ModalLoader />
            : <></>}
          {viewModal.state && viewModal.type === 'user-not-found'
            ? <ModalError type='user-not-found' />
            : <></>}
          {viewModal.state && viewModal.type === 'success-reset'
            ? <ModalSuccessResetPass />
            : <></>}
        </form>
      </main>
      )
}

export default RecoverPassword
