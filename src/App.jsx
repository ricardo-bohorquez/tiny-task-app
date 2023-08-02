import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './routes/Home'
import { Login } from './routes/Login'
import { Register } from './routes/Register'
import { Dashboard } from './routes/Dashboard'
import { useAuth } from './context/AuthContext'
import { Header } from './components/Header'

function App () {
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <Routes>
        <Route path='/tiny-task-app/' element={<Home />} />
        <Route path='/tiny-task-app/login' element={<Login />} />
        <Route path='/tiny-task-app/register' element={<Register />} />
        <Route path='/tiny-task-app/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
