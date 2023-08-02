import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../configFirebase'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export function AuthProvider ({ children }) {
  const resetModalProps = {
    state: false,
    id: 0,
    type: `none`
  }

  const [viewModal, setViewModal] = useState(resetModalProps)

  const [user, setUser] = useState(null)

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logOut = () => signOut(auth)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        viewModal,
        setViewModal,
        resetModalProps,
        signUp,
        signIn,
        logOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
