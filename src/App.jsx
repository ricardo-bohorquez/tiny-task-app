import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'
import ModalLoader from './components/modals/ModalLoader'

const Header = lazy(() => import('./components/Header'))
const Home = lazy(() => import('./routes/Home'))
const Login = lazy(() => import('./routes/Login'))
const Register = lazy(() => import('./routes/Register'))
const RecoverPassword = lazy(() => import('./routes/RecoverPassword'))
const Dashboard = lazy(() => import('./routes/Dashboard'))
const Settings = lazy(() => import('./routes/Settings'))
const NotFound = lazy(() => import('./routes/NotFound'))
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'))

function App () {
  return (
    <>
      <Header />
      <Suspense fallback={<ModalLoader />}>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/password-recovery' component={RecoverPassword} />
          <Route path='/dashboard'>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path='/settings'>
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </>
  )
}

export default App
