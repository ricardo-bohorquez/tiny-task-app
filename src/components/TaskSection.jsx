import TaskForm from './TaskForm'
import TaskList from './TaskList'

function TaskSection () {
  return (
    <section className='task-section'>
      <TaskForm />
      <TaskList />
    </section>
  )
}

export default TaskSection
