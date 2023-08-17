import { createContext, useState, useEffect, useContext } from 'react'
import { db } from '../../configFirebase.js'
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

  const [isReading, setIsReading] = useState(true)
  const [isReadingError, setIsReadingError] = useState(false)

  const readData = async () => {
    try {
      const docSnap = await getDoc(docRef)
      const docData = docSnap.data()
      const { pending, performed } = docData.listOfTask
      setTasks({ pending, performed })
      setIsReading(false)
      return { pending, performed }
    } catch (error) {
      setIsReading(false)
      setIsReadingError(true)
      return {}
    }
  }

  const createTask = async (title, description) => {
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
    await updateDoc(docRef, { 'listOfTask.pending': arrayRemove(task) })
    readData()
  }

  const markDone = async task => {
    setIsReading(true)
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
        setIsReading,
        isReadingError
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}
