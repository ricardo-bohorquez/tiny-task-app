import { useState } from 'react'
import { useTask } from '../context/TaskContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import taskSchema from '../schemas/tasks.schema'

function TaskForm () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createTask } = useTask()
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(taskSchema) })

  return (
    <form
      onSubmit={handleSubmit(({ title, description }) => {
        createTask(title, description)
      })} className='task-form'
    >
      <input
        placeholder='Escribe el título de la nueva tarea'
        onChange={({ target: { value } }) => setTitle(value)}
        autoFocus
        {...register('title', { value: title })}
      />
      {errors.title && <span className='text-white span-error-taskform'>{errors.title.message}</span>}
      <textarea
        placeholder='Escribe una descripción para la nueva tarea'
        onChange={({ target: { value } }) => setDescription(value)}
        {...register('description', { value: description })}
      />
      {errors.description && <span className='text-white span-error-taskform'>{errors.description.message}</span>}
      <button>Agregar tarea</button>
    </form>
  )
}

export default TaskForm
