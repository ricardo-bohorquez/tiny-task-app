import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import ModalLoginError from '../components/modals/ModalLoginError'
import ModalSuccessResetPass from '../components/modals/ModalSuccessResetPass'

function RecoverPassword () {
  const { recoverPassword, setViewModal, viewModal, user } = useAuth()
  const [emailToRecoverPass, setEmailToRecoverPass] = useState('')

  const handleRecoverPassword = async e => {
    e.preventDefault()
    try {
      await recoverPassword(emailToRecoverPass)
      setViewModal({ ...viewModal, state: true, type: 'success-reset' })
    } catch ({ code }) {
      console.log(code)
      if (code === 'auth/missing-email')
        setViewModal({ ...viewModal, state: true, type: 'user-not-found' })
    }
  }

  return user ? (
    <Navigate to='/tiny-task-app/dashboard' />
  ) : (
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
        {viewModal.state && viewModal.type === 'user-not-found' ? (
          <ModalLoginError />
        ) : (
          <></>
        )}
        {viewModal.state && viewModal.type === 'success-reset' ? (
          <ModalSuccessResetPass />
        ) : (
          <></>
        )}
      </form>
    </main>
  )
}

export default RecoverPassword
