import { createContext, useState, useEffect, useContext } from 'react'
import { db } from '../../configFirebase.js'
import { doc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  return context
}

export function TaskContextProvider ({ children }) {
  const { user: { uid } } = useAuth()
  const docRef = doc(db, 'users', uid)

  const [isReading, setIsReading] = useState(true)

  const [tasks, setTasks] = useState({
    pending: [],
    performed: []
  })

  const readData = async () => {
    const { getDoc } = await import('firebase/firestore')
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()
    const { pending, performed } = docData.listOfTask
    setTasks({ pending, performed })
    setIsReading(false)
  }

  const createTask = async (title, description) => {
    setIsReading(true)
    const { updateDoc, arrayUnion } = await import('firebase/firestore')
    const { v4 } = await import('uuid')
    const creationDate = dayjs().format('DD/MM/YYYY hh:mm a')
    const id = v4()
    const done = false
    const taskObject = {
      title,
      description,
      creationDate,
      done,
      id
    }
    await updateDoc(docRef, { 'listOfTask.pending': arrayUnion(taskObject) })
    await readData()
  }

  const deleteTask = async task => {
    setIsReading(true)
    const { updateDoc, arrayRemove } = await import('firebase/firestore')
    await updateDoc(docRef, { 'listOfTask.pending': arrayRemove(task) })
    await readData()
  }

  const markDone = async task => {
    setIsReading(true)
    const { updateDoc, arrayUnion, arrayRemove } = await import('firebase/firestore')
    const t = { ...task }
    if (task.done === false) {
      task.done = !task.done
      await updateDoc(docRef, {
        'listOfTask.pending': arrayRemove(t),
        'listOfTask.performed': arrayUnion(task)
      })
    } else {
      task.done = !task.done
      await updateDoc(docRef, {
        'listOfTask.pending': arrayUnion(task),
        'listOfTask.performed': arrayRemove(t)
      })
    }
    await readData()
  }

  useEffect(() => {
    async function firstRead () {
      await readData()
    }
    firstRead()
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        markDone,
        isReading,
        setIsReading
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
