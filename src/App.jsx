import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home'
import { Login } from './routes/Login'
import { Register } from './routes/Register'
import { Dashboard } from './routes/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { Header } from './components/Header'

function App () {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/tiny-task-app/' element={<Home />} />
        <Route path='/tiny-task-app/login' element={<Login />} />
        <Route path='/tiny-task-app/register' element={<Register />} />
        <Route path='/tiny-task-app/dashboard' element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
