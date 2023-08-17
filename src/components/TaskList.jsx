import TaskCard from './TaskCard'
import { useTask } from '../context/TaskContext'
import { CircularProgress } from '@mui/material'

function TaskList () {
  const { tasks, isReading, isReadingError } = useTask()
  const { pending, performed } = tasks

  if (isReading) return <CircularProgress />
  else if (pending.length === 0 && performed.length === 0)
    return <h2>No hay tareas agregadas</h2>
  else
    return (
      <section className='task-list'>
        <div className='pending-task'>
          <h3>Tareas pendientes:</h3>
          <ul className='list'>
            {pending.length === 0 ? (
              <h4>No hay tareas pendientes</h4>
            ) : (
              pending.map((t, i) => {
                return <TaskCard key={i} task={t} index={i} />
              })
            )}
          </ul>
        </div>
        <div className='done-task'>
          <h3>Tareas realizadas:</h3>
          <ul className='list'>
            {performed.length === 0 ? (
              <h4>No hay tareas realizadas</h4>
            ) : (
              performed.map((t, i) => {
                return <TaskCard key={i} task={t} index={i} />
              })
            )}
          </ul>
        </div>
      </section>
    )
}

export default TaskList
