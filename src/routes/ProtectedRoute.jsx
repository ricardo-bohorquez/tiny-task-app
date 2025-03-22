import { Redirect } from 'wouter'
import { useAuth } from '../context/AuthContext'
import ModalLoader from '../components/modals/ModalLoader'

function ProtectedRoute ({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <ModalLoader />
  if (!user) return <Redirect to='/tiny-task-app/login' />
  return <>{children}</>
}
export default ProtectedRoute
