import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../../configFirebase'

const AuthContext = createContext()

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
  const [loading, setLoading] = useState(true)

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logOut = () => signOut(auth)

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const recoverPassword = email => sendPasswordResetEmail(auth, email)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
  })

  return (
    <AuthContext.Provider
      value={{
        viewModal,
        setViewModal,
        resetModalProps,
        signUp,
        signIn,
        logOut,
        user,
        loading,
        setLoading,
        googleLogin,
        recoverPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
