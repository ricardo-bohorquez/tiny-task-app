import TaskSection from '../components/TaskSection'
import { TaskContextProvider } from '../context/TaskContext'

function Dashboard () {
  return (
    <TaskContextProvider>
      <main className='dashboard'>
        <TaskSection />
      </main>
    </TaskContextProvider>
  )
}

export default Dashboard
