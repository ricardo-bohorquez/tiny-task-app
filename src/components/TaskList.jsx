import { CircularProgress } from '@mui/material'
import { useTask } from '@/context/TaskContext'
import TaskCard from './TaskCard'

function TaskList () {
  const { tasks, isReading } = useTask()

  const { pending, performed } = tasks

  if (isReading) {
    return (
      <section className='task-list'>
        <CircularProgress style={{ marginTop: '40px' }} />
      </section>
    )
  } else if (pending.length === 0 && performed.length === 0) {
    return (
      <section className='task-list'>
        <h2>No hay tareas agregadas</h2>
      </section>
    )
  } else {
    return (
      <section className='task-list'>
        <div className='pending-task'>
          <h3>Tareas pendientes</h3>
          <ul className='list'>
            {pending.length === 0
              ? <h4>No hay tareas pendientes</h4>
              : (pending.map((t, i) => {
                  return <TaskCard key={i} task={t} index={i} />
                }))}
          </ul>
        </div>
        <div className='done-task'>
          <h3>Tareas realizadas</h3>
          <ul className='list'>
            {performed.length === 0
              ? <h4>No hay tareas realizadas</h4>
              : (performed.map((t, i) => {
                  return <TaskCard key={i} task={t} index={i} />
                }))}
          </ul>
        </div>
      </section>
    )
  }
}

export default TaskList
