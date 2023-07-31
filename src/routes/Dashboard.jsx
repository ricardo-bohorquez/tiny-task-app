import TaskSection from '../components/TaskSection'
import { TaskContextProvider } from '../context/TaskContext'
export function Dashboard () {
  return (
    <TaskContextProvider>
      <main className='App'>
        <h1>Lista de cosas por hacer</h1>
        <TaskSection />
      </main>
    </TaskContextProvider>
  )
}
