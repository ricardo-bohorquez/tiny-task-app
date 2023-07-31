import { useAuth } from '../../context/AuthContext'
import success from '../../icons/circle-check-regular.svg'

function ModalSuccesRegister () {
  const { resetModalProps, setViewModal } = useAuth()
  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-success-register'>
        <h3>Registro satisfactorio</h3>
        <label style={{ textAlign: 'center' }}>
          Verifica tu registro con el enlace de confirmación en tu bandeja de
          entrada
        </label>
        <img src={success} style={{ width: '50px' }} />
        <button onClick={() => setViewModal(resetModalProps)}>Aceptar</button>
      </div>
    </section>
  )
}

export default ModalSuccesRegister
