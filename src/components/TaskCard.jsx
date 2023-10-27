import dots from '../icons/ellipsis-solid.svg'
import { useTask } from '../context/TaskContext'
import { useAuth } from '../context/AuthContext'
import ModalDelete from './modals/ModalDelete'
import ModalTaskDescription from './modals/ModalTaskDescription'

function TaskCard ({ task = {}, index = '' }) {
  const { markDone } = useTask()
  const { viewModal, setViewModal } = useAuth()
  return (
    <li id={index + '-element'}>
      <div>
        <h4>{task.title}</h4>
        <img
          src={dots}
          onClick={() =>
            setViewModal({
              state: true,
              id: task.id,
              type: 'description'
            })}
        />
      </div>
      <div className='buttons-container'>
        <button onClick={() => markDone(task)}>
          {task.done === false ? 'Marcar lista' : 'Marcar pendiente'}
        </button>
        {task.done === false
          ? (
            <button
              onClick={() =>
                setViewModal({
                  state: true,
                  id: task.id,
                  type: 'delete'
                })}
            >
              Eliminar tarea
            </button>
            )
          : (
            <></>
            )}
      </div>
      <span>Se creó el {task.creationDate}</span>
      {viewModal.state &&
      viewModal.id === task.id &&
      viewModal.type === 'delete'
        ? (
          <ModalDelete task={task} idx={index} />
          )
        : (
          <></>
          )}
      {viewModal.state &&
      viewModal.id === task.id &&
      viewModal.type === 'description'
        ? (
          <ModalTaskDescription task={task} idx={index} />
          )
        : (
          <></>
          )}
    </li>
  )
}
export default TaskCard
