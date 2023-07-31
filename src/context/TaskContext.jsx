import { createContext, useState, useEffect } from 'react'
import { db } from '../configFirebase.js'
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

export const TaskContext = createContext()

export function TaskContextProvider (props) {
  async function readData (id) {
    const docRef = doc(db, 'users', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  }

  async function erase (id) {
    await deleteDoc(doc(db, 'users', id))
  }

  const [tasks, setTask] = useState([])

  useEffect(() => setTask(tasks), [])

  async function createTask (title, description) {
    const id = uuidv4()
    const creationDate = dayjs().format('DD/MM/YYYY hh:mm a')
    const done = false
    await setDoc(doc(db, 'tasks', id), {
      title,
      description,
      creationDate,
      done
    })
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
    erase(id)
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
