import { useAuth } from '../../context/AuthContext'
import error from '../../icons/circle-xmark-regular.svg'

function ModalError ({ type = '' }) {
  const { resetModalProps, setViewModal } = useAuth()

  const textOfModal = [
    'No puede crear tareas con títulos ni descripciones vacías',
    'El correo ingresado no se encuentra asociado a ninguna cuenta',
    'El correo ingresado ya se encuentra asociado a otra cuenta'
  ]

  return (
    <section
      className='modal-body'
      id='modal-error'
      style={{ display: 'flex' }}
    >
      <div className='modal-content'>
        {type === 'empty-form-error' ? <h3>{textOfModal[0]}</h3> : <></>}
        {type === 'user-not-found' ? <h3>{textOfModal[1]}</h3> : <></>}
        {type === 'email-in-use' ? <h3>{textOfModal[2]}</h3> : <></>}
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
