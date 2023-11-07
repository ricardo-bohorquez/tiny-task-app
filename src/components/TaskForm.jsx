import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTask } from '../context/TaskContext'
import ModalError from './modals/ModalError'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function TaskForm () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createTask } = useTask()
  const { viewModal, setViewModal } = useAuth()
  const { register, handleSubmit } = useForm()

  const schema = z.object({
    title: z.string().minLength(4).maxLength(30),
    description: z.string().minLength(10).maxLength(300)
  })

  function submit (e) {
    if (title === '' || description === '') {
      setViewModal({ ...viewModal, state: true, type: 'error' })
    } else {
      createTask(title, description)
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data)
      })} className='task-form'
    >
      <input
        placeholder='Escribe el título de la nueva tarea'
        onChange={({ target: { value } }) => setTitle(value)}
        autoFocus
        {...register('title', { required: true, minLength: 4, maxLength: 30, value: title })}
      />
      <textarea
        placeholder='Escribe una descripción para la nueva tarea'
        onChange={({ target: { value } }) => setDescription(value)}
        {...register('description', { required: true, minLength: 10, maxLength: 300, value: description })}
      />
      <button>Agregar tarea</button>
      {viewModal.state === true && viewModal.type === 'error'
        ? (<ModalError type='empty-form-error' />)
        : (<></>)}
    </form>
  )
}

export default TaskForm
