import TaskSection from '../components/TaskSection'
import { TaskContextProvider } from '../context/TaskContext'

export function Dashboard () {
  return (
    <TaskContextProvider>
      <main className='dashboard'>
        <h2>Lista de cosas por hacer</h2>
        <TaskSection />
      </main>
    </TaskContextProvider>
  )
}
