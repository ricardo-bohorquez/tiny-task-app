import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
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
    type: 'none'
  }

  const [viewModal, setViewModal] = useState(resetModalProps)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signUp = async (email, password) => {
    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = async (email, password) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    const { signOut } = await import('firebase/auth')
    await signOut(auth)
  }

  const googleLogin = async () => {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
    const googleProvider = new GoogleAuthProvider()
    return await signInWithPopup(auth, googleProvider)
  }

  const recoverPassword = async email => {
    const { sendPasswordResetEmail } = await import('firebase/auth')
    await sendPasswordResetEmail(auth, email)
  }

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
