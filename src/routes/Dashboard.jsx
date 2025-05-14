import TaskSection from '@/components/TaskSection'
import { TaskProvider } from '@/context/TaskContext'

function Dashboard () {
  return (
    <TaskProvider>
      <main className='dashboard'>
        <TaskSection />
      </main>
    </TaskProvider>
  )
}

export default Dashboard
