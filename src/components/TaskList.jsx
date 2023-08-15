import TaskCard from './TaskCard'
import { useTask } from '../context/TaskContext'

function TaskList () {
  const { tasks } = useTask()

  return tasks.listOfTask === 0 ? (
    <h2>No hay tareas agregadas</h2>
  ) : (
    <section className='task-list'>
      <div className='pending-task'>
        <h3>Tareas pendientes:</h3>
        <ul className='list'>
        </ul>
      </div>
      <div className='done-task'>
        <h3>Tareas realizadas:</h3>
        <ul className='list'>
        </ul>
      </div>
    </section>
  )
}

export default TaskList
