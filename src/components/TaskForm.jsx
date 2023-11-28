import { useTask } from '../context/TaskContext'
import { useForm } from 'react-hook-form'
import taskSchema from '../schemas/tasks.schema'
import { TASK_FORM_STRING } from '../constants/tasksConstants'

function TaskForm () {
  const { createTask } = useTask()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { title, description } = taskSchema
  const { ADD_TASK, TITLE_PLACEHOLDER, DESCRIPTION_PLACEHOLDER } = TASK_FORM_STRING

  return (
    <form
      onSubmit={handleSubmit(({ title, description }) => {
        createTask(title, description)
        reset()
      })} className='task-form'
    >
      <input
        placeholder={TITLE_PLACEHOLDER}
        autoFocus
        {...register('title', title)}
      />
      {errors.title && <span className='text-white span-error-taskform'>{errors.title.message}</span>}
      <textarea
        placeholder={DESCRIPTION_PLACEHOLDER}
        {...register('description', description)}
      />
      {errors.description && <span className='text-white span-error-taskform'>{errors.description.message}</span>}
      <button>{ADD_TASK}</button>
    </form>
  )
}

export default TaskForm
