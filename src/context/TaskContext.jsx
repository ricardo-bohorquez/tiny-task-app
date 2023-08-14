import { createContext, useState, useEffect, useContext } from 'react'
import { db } from '../configFirebase.js'
import { doc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  return context
}

export function TaskContextProvider (props) {
  const [tasks, setTask] = useState([])

  useEffect(() => setTask(tasks), [])

  function createTask (title, description) {
    const id = uuidv4()
    const creationDate = dayjs().format('DD/MM/YYYY hh:mm a')
    const done = false
  }

  function deleteTask (id, index) {
    document.getElementById(`${index}-modal`).style.display = 'none'
    document
      .getElementById(`${index}-element`)
      .classList.add(`animate__backOutRight`)
    setTimeout(() => {
      setTask(tasks.filter(tsk => tsk.id !== id))
      document
        .getElementById(`${index}-element`)
        .classList.remove(`animate__backOutRight`)
    }, 800)
  }

  function markDone (task) {
    task.done === false ? (task.done = true) : (task.done = false)
    setTask(
      tasks.map(t => {
        t.id === task.id ?? (t.done = task.done)
      })
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        markDone
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}
