import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTask } from '../context/TaskContext'
import ModalError from './modals/ModalError'

function TaskForm () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createTask } = useTask()
  const { viewModal, setViewModal } = useAuth()

  function handleSubmit (e) {
    if (title === `` || description === ``) {
      e.preventDefault()
      setViewModal({ ...viewModal, state: true, type: `error` })
    } else {
      e.preventDefault()
      createTask(title, description)
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <input
        placeholder='Escribe el título de la nueva tarea'
        onChange={({ target: { value } }) => setTitle(value)}
        value={title}
        autoFocus
        maxLength={25}
      />
      <textarea
        placeholder='Escribe una descripción para la nueva tarea'
        onChange={({ target: { value } }) => setDescription(value)}
        value={description}
        maxLength={250}
      ></textarea>
      <button>Agregar tarea</button>
      {viewModal.state === true && viewModal.type === `error` ? (
        <ModalError type={'empty-form-error'} />
      ) : (
        <></>
      )}
    </form>
  )
}

export default TaskForm
