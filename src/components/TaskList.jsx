import TaskCard from './TaskCard'
import { useTask } from '@/context/TaskContext'
import { CircularProgress } from '@mui/material'
import { TASK_LIST_STRING } from '@/constants/tasksConstants'

function TaskList () {
  const { tasks, isReading } = useTask()
  const { pending, performed } = tasks
  const { NO_TASK, NO_PENDING, NO_PERFORMED, PENDING_TITLE, PERFORMED_TITLE } = TASK_LIST_STRING

  if (isReading) {
    return (
      <section className='task-list'>
        <CircularProgress style={{ marginTop: '40px' }} />
      </section>
    )
  } else if (pending.length === 0 && performed.length === 0) {
    return (
      <section className='task-list'>
        <h2>{NO_TASK}</h2>
      </section>
    )
  } else {
    return (
      <section className='task-list'>
        <div className='pending-task'>
          <h3>{PENDING_TITLE}</h3>
          <ul className='list'>
            {pending.length === 0
              ? <h4>{NO_PENDING}</h4>
              : (pending.map((t, i) => {
                  return <TaskCard key={i} task={t} index={i} />
                }))}
          </ul>
        </div>
        <div className='done-task'>
          <h3>{PERFORMED_TITLE}</h3>
          <ul className='list'>
            {performed.length === 0
              ? <h4>{NO_PERFORMED}</h4>
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
