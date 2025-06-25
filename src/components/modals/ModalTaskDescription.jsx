import { useAuth } from '@/context/AuthContext'

function ModalTaskDescription ({ task = {}, idx = '' }) {
  const { resetModalProps, setViewModal } = useAuth()

  return (
    <section
      className='modal-body'
      id={`task-desc-${idx}`}
      style={{ display: 'flex' }}
    >
      <div className='modal-content modal-task-description'>
        <h4>{task.title}</h4>
        <label>Descripción:</label>
        <p>{task.description}</p>
        <button onClick={() => setViewModal(resetModalProps)}>Cerrar</button>
      </div>
    </section>
  )
}

export default ModalTaskDescription
