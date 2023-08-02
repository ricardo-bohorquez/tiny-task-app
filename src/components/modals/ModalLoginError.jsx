import { useAuth } from '../../context/AuthContext'
import error from '../../icons/circle-xmark-regular.svg'

function ModalLoginError () {
  const { resetModalProps, setViewModal } = useAuth()
  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-login-error'>
        <h3>El correo ingresado no se encuentra asociado a ninguna cuenta</h3>
        <img src={error} style={{ width: '50px' }} />
        <button onClick={() => setViewModal(resetModalProps)}>Aceptar</button>
      </div>
    </section>
  )
}

export default ModalLoginError
