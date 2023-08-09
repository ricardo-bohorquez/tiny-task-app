import TaskSection from '../components/TaskSection'
import { TaskContextProvider } from '../context/TaskContext'
import { useAuth } from '../context/AuthContext'

export function Dashboard () {
  const { user } = useAuth()
  return !user ? (
    <main className='dashboard-no-logged'>
      <h2>Inicia sesión o registrate para empezar a usar nuestra app</h2>
    </main>
  ) : (
    <TaskContextProvider>
      <main className='dashboard'>
        <h2>Lista de cosas por hacer</h2>
        <TaskSection />
      </main>
    </TaskContextProvider>
  )
}
