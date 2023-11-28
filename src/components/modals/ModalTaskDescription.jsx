import { useAuth } from '../../context/AuthContext'
import { MODAL_BUTTON_STRING, MODAL_TASK_STRING } from '../../constants/modalsConstants'

function ModalTaskDescription ({ task = {}, idx = '' }) {
  const { resetModalProps, setViewModal } = useAuth()
  const { CLOSE } = MODAL_BUTTON_STRING
  const { DESCRIPTION } = MODAL_TASK_STRING
  return (
    <section
      className='modal-body'
      id={`task-desc-${idx}`}
      style={{ display: 'flex' }}
    >
      <div className='modal-content modal-task-description'>
        <h4>{task.title}</h4>
        <label>{DESCRIPTION}</label>
        <p>{task.description}</p>
        <button onClick={() => setViewModal(resetModalProps)}>{CLOSE}</button>
      </div>
    </section>
  )
}

export default ModalTaskDescription
