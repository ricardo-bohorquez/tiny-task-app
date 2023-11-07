import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ModalSuccessResetPass () {
  const { resetModalProps, setViewModal } = useAuth()
  const navigate = useNavigate()
  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-login-error'>
        <h3>Correo enviado exitosamente, revisa tu bandeja de entrada</h3>
        <button
          onClick={() => {
            navigate('/login')
            setViewModal(resetModalProps)
          }}
        >
          Aceptar
        </button>
      </div>
    </section>
  )
}

export default ModalSuccessResetPass
