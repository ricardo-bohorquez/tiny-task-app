import dots from '../icons/ellipsis-solid.svg'
import { useTask } from '../context/TaskContext'
import { useAuth } from '../context/AuthContext'
import ModalDelete from './modals/ModalDelete'
import ModalTaskDescription from './modals/ModalTaskDescription'
import { TASK_CARD_STRING } from '../constants/tasksConstants'
import { MODAL_TYPE } from '../constants/modalsConstants'

function TaskCard ({ task, index }) {
  const { markDone } = useTask()
  const { viewModal, setViewModal } = useAuth()
  const { PERFORMED, DELETE, PENDING, CREATED_AT } = TASK_CARD_STRING
  const { TYPE_DELETE, TYPE_DESCRIPTION } = MODAL_TYPE

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
              type: TYPE_DESCRIPTION
            })}
        />
      </div>
      <div className='buttons-container'>
        <button onClick={() => markDone(task)}>
          {task.done === false ? PERFORMED : PENDING}
        </button>
        {task.done === false
          ? (
            <button
              onClick={() =>
                setViewModal({
                  state: true,
                  id: task.id,
                  type: TYPE_DELETE
                })}
            >
              {DELETE}
            </button>
            )
          : <></>}
      </div>
      <span>{CREATED_AT}{task.creationDate}</span>
      {viewModal.state &&
      viewModal.id === task.id &&
      viewModal.type === TYPE_DELETE
        ? <ModalDelete task={task} idx={index} />
        : <></>}
      {viewModal.state &&
      viewModal.id === task.id &&
      viewModal.type === TYPE_DESCRIPTION
        ? <ModalTaskDescription task={task} idx={index} />
        : <></>}
    </li>
  )
}
export default TaskCard
