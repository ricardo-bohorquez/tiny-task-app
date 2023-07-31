import { useAuth } from '../../context/AuthContext'
import error from '../../icons/circle-xmark-regular.svg'

function ModalRegisterError () {
  const { resetModalProps, setViewModal } = useAuth()
  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-register-error'>
        <h3>El correo ingresado ya se encuentra asociado a otra cuenta</h3>
        <img src={error} style={{ width: '50px' }} />
        <button onClick={() => setViewModal(resetModalProps)}>Aceptar</button>
      </div>
    </section>
  )
}

export default ModalRegisterError
