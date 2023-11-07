import { createContext, useState, useEffect, useContext } from 'react'
import { db } from '../../configFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

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
    try {
      const docSnap = await getDoc(docRef)
      const docData = docSnap.data()
      const { pending, performed } = docData.listOfTask
      setTasks({ pending, performed })
      setIsReading(false)
      return { pending, performed }
    } catch ({ message }) {
      setIsReading(false)
      console.error(message)
      return {}
    }
  }

  const createTask = async (title, description) => {
    const { updateDoc, arrayUnion } = await import('firebase/firestore')
    const { v4 } = await import('uuid')
    const dayjs = await import('dayjs')
    const customParseFormat = await import('dayjs/plugin/customParseFormat.js')
    dayjs.extend(customParseFormat)
    dayjs.locale('es')
    const creationDate = dayjs.default().format('DD/MM/YYYY hh:mm a')
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
    setIsReading(true)
  }

  const deleteTask = async task => {
    const { updateDoc, arrayRemove } = await import('firebase/firestore')
    await updateDoc(docRef, { 'listOfTask.pending': arrayRemove(task) })
    setIsReading(true)
  }

  const markDone = async task => {
    const { updateDoc, arrayUnion, arrayRemove } = await import('firebase/firestore')
    try {
      if (task.done === false) {
        await updateDoc(docRef, { 'listOfTask.pending': arrayRemove(task) })
        task.done = !task.done
        await updateDoc(docRef, { 'listOfTask.performed': arrayUnion(task) })
      } else {
        await updateDoc(docRef, { 'listOfTask.performed': arrayRemove(task) })
        task.done = !task.done
        await updateDoc(docRef, { 'listOfTask.pending': arrayUnion(task) })
      }
    } catch (error) {
      console.log(error.message)
    }
    setIsReading(true)
  }

  useEffect(() => {
    readData()
  })

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
