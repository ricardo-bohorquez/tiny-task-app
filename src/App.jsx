import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home'
import { Login } from './routes/Login'
import { Register } from './routes/Register'
import { Dashboard } from './routes/Dashboard'
import { Header } from './components/Header'
import RecoverPassword from './routes/RecoverPassword'
import ProtectedRoute from './routes/ProtectedRoute'

function App () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/password-recovery'
          element={<RecoverPassword />}
        />
      </Routes>
    </>
  )
}

export default App
