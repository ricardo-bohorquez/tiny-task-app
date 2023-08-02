import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import success from '../../icons/circle-check-regular.svg'

function ModalSuccesRegister () {
  const { resetModalProps, setViewModal } = useAuth()
  const navigate = useNavigate()
  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-success-register'>
        <h3>Registro satisfactorio</h3>
        <label style={{ textAlign: 'center' }}>
          Usuario registrado exitosamente
        </label>
        <img src={success} style={{ width: '50px' }} />
        <button
          onClick={() => {
            setViewModal(resetModalProps)
            navigate('/tiny-task-app/login')
          }}
        >
          Aceptar
        </button>
      </div>
    </section>
  )
}

export default ModalSuccesRegister
