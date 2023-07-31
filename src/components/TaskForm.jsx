import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ModalEmptyError from './modals/ModalEmptyError'

function TaskForm () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createTask, viewModal, setViewModal } = useAuth()

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
        onChange={e => setTitle(e.target.value)}
        value={title}
        autoFocus
        maxLength={25}
      />
      <textarea
        placeholder='Escribe una descripción para la nueva tarea'
        onChange={e => setDescription(e.target.value)}
        value={description}
        maxLength={250}
      ></textarea>
      <button>Agregar tarea</button>
      {viewModal.state === true && viewModal.type === `error` ? (
        <ModalEmptyError />
      ) : (
        <></>
      )}
    </form>
  )
}

export default TaskForm
