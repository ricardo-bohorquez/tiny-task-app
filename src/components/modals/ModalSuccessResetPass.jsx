import { useLocation } from 'wouter'
import { useAuth } from '@/context/AuthContext'

function ModalSuccessResetPass () {
  const [, setLocation] = useLocation()
  const { resetModalProps, setViewModal } = useAuth()

  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-login-error'>
        <h3>Correo enviado exitosamente, revisa tu bandeja de entrada</h3>
        <button
          onClick={() => {
            setViewModal(resetModalProps)
            setLocation('/login', { replace: true })
          }}
        >
          Aceptar
        </button>
      </div>
    </section>
  )
}

export default ModalSuccessResetPass
