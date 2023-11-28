import { useTask } from '../../context/TaskContext'
import { useAuth } from '../../context/AuthContext'
import { MODAL_BUTTON_STRING, MODAL_DELETE_TASK_MESSAGE } from '../../constants/modalsConstants'

function ModalDelete ({ task = {}, idx = '' }) {
  const { deleteTask } = useTask()
  const { resetModalProps, setViewModal } = useAuth()
  const { DEL_TASK_MSG } = MODAL_DELETE_TASK_MESSAGE
  const { ACCEPT, CANCEL } = MODAL_BUTTON_STRING
  return (
    <section
      className='modal-body'
      id={idx + '-modal'}
      style={{ display: 'flex' }}
    >
      <div className='modal-content'>
        <h3>{DEL_TASK_MSG}</h3>
        <label>{task.title}</label>
        <div className='selection-container'>
          <button
            id='confirmDelete'
            onClick={() => {
              setViewModal(resetModalProps)
              deleteTask(task)
            }}
          >
            {ACCEPT}
          </button>
          <button
            id='cancelDelete'
            onClick={() => setViewModal(resetModalProps)}
          >
            {CANCEL}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ModalDelete
