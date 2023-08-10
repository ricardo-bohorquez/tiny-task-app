import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home'
import { Login } from './routes/Login'
import { Register } from './routes/Register'
import { Dashboard } from './routes/Dashboard'
import { Header } from './components/Header'
import ProtectedRoute from './routes/ProtectedRoute'

function App () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/tiny-task-app/' element={<Home />} />
        <Route path='/tiny-task-app/login' element={<Login />} />
        <Route path='/tiny-task-app/register' element={<Register />} />
        <Route
          path='/tiny-task-app/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
