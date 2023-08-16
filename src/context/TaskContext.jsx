import { createContext, useState, useEffect, useContext } from 'react'
import { db } from '../configFirebase.js'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')
import { v4 as uuid } from 'uuid'

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  return context
}

export function TaskContextProvider (props) {
  const { user } = useAuth()
  const { email, displayName } = user
  const userRef = !email ? displayName : email
  const docRef = doc(db, 'users', userRef)

  const readTask = async () => {
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()
    const { pending, performed } = docData.listOfTask
    return { pending, performed }
  }

  const [tasks, setTask] = useState(async () => console.log(await readTask()))

  useEffect(() => {
    setTask(tasks)
  })

  const createTask = async (title, description) => {
    const creationDate = dayjs().format('DD/MM/YYYY hh:mm a')
    const done = false
    const id = uuid()
    const taskObject = new Object()
    taskObject[id] = {
      title,
      description,
      creationDate,
      done
    }
    await updateDoc(docRef, {
      'listOfTask.pending': arrayUnion(taskObject)
    })
  }

  const deleteTask = async (id, index) => {
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
