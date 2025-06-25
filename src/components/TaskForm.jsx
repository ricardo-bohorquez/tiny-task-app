import { useTask } from '@/context/TaskContext'
import { useForm } from 'react-hook-form'

import taskSchema from '@/schemas/tasks.schema'

function TaskForm () {
  const { createTask } = useTask()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const { title, description } = taskSchema

  return (
    <form
      onSubmit={handleSubmit(({ title, description }) => {
        createTask(title, description)
        reset()
      })} className='task-form'
    >
      <input
        placeholder='Escribe el título de la nueva tarea'
        autoFocus
        {...register('title', title)}
      />
      {errors.title && <span className='text-white span-error-taskform'>{errors.title.message}</span>}
      <textarea
        placeholder='Escribe una descripción para la nueva tarea (opcional)'
        {...register('description', description)}
      />
      {errors.description && <span className='text-white span-error-taskform'>{errors.description.message}</span>}
      <button>Agregar tarea</button>
    </form>
  )
}

export default TaskForm
