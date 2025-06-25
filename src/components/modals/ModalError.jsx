import { useAuth } from '@/context/AuthContext'

import error from '@/icons/circle-xmark-regular.svg'

function ModalError ({ type = '' }) {
  const { resetModalProps, setViewModal } = useAuth()

  const EMAIL_IN_USE = 'email-already-in-use'
  const INVALID_CREDENTIAL = 'invalid-credential'

  return (
    <section
      className='modal-body'
      id='modal-error'
      style={{ display: 'flex' }}
    >
      <div className='modal-content'>
        {type === INVALID_CREDENTIAL ? <h3>Verifique el correo o la contraseña</h3> : <></>}
        {type === EMAIL_IN_USE ? <h3>El correo ingresado ya se encuentra asociado a otra cuenta</h3> : <></>}
        <img src={error} style={{ width: '50px' }} />
        <button
          onClick={() => setViewModal(resetModalProps)}
          id='acceptError'
          autoFocus
        >
          Aceptar
        </button>
      </div>
    </section>
  )
}

export default ModalError
