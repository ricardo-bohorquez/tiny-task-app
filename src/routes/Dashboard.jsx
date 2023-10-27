import TaskSection from '../components/TaskSection'
import { TaskContextProvider } from '../context/TaskContext'

export function Dashboard () {
  return (
    <TaskContextProvider>
      <main className='dashboard'>
        <TaskSection />
      </main>
    </TaskContextProvider>
  )
}
