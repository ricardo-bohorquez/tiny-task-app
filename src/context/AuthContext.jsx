import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/configFirebase'

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
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState({
    accountCreationDate: '',
    loginWithGoogle: false
  })

  const ref = {}

  const signUp = async (email, password) => {
    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = async (email, password) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    return await signInWithEmailAndPassword(auth, email, password)
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

  const readRegisterInfo = async () => {
    const { doc, getDoc } = await import('firebase/firestore')
    const { db } = await import('@/config/configFirebase')
    if (user === null || user === ref) {
      return {}
    } else {
      const { uid } = user
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      const docData = docSnap.data()
      const { accountCreationDate, loginWithGoogle } = docData
      setInfo({ accountCreationDate, loginWithGoogle })
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
  })

  useEffect(() => {
    readRegisterInfo()
  }, [user])

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
        info,
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
