import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'
import ModalLoader from '@/components/modals/ModalLoader'

const Header = lazy(() => import('@/components/Header'))
const Footer = lazy(() => import('@/components/Footer'))
const Home = lazy(() => import('@/routes/public/Home'))
const Login = lazy(() => import('@/routes/public/Login'))
const Register = lazy(() => import('@/routes/public/Register'))
const RecoverPassword = lazy(() => import('@/routes/public/RecoverPassword'))
const NotFound = lazy(() => import('@/routes/public/NotFound'))
const Dashboard = lazy(() => import('@/routes/private/Dashboard'))
const Settings = lazy(() => import('@/routes/private/Settings'))
const ProtectedRoute = lazy(() => import('@/routes/private/ProtectedRoute'))

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
      <Footer />
    </>
  )
}

export default App
