import { createContext, useState, useEffect, useContext } from 'react'
import { db } from '../../configFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
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
  const {
    user: { uid }
  } = useAuth()
  const docRef = doc(db, 'users', uid)

  const [isReading, setIsReading] = useState(true)

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
    setIsReading(true)
    const creationDate = dayjs().format('DD/MM/YYYY hh:mm a')
    const id = uuid()
    const done = false
    const taskObject = {
      title,
      description,
      creationDate,
      done,
      id
    }
    await updateDoc(docRef, {
      'listOfTask.pending': arrayUnion(taskObject)
    })
    readData()
  }

  const deleteTask = async task => {
    setIsReading(true)
    const { updateDoc, arrayRemove } = await import('firebase/firestore')
    await updateDoc(docRef, { 'listOfTask.pending': arrayRemove(task) })
    readData()
  }

  const markDone = async task => {
    setIsReading(true)
    const { updateDoc, arrayUnion, arrayRemove } = await import(
      'firebase/firestore'
    )
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
    readData()
  }

  const [tasks, setTasks] = useState({
    pending: [],
    performed: []
  })

  useEffect(() => {
    readData()
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
      {props.children}
    </TaskContext.Provider>
  )
}
