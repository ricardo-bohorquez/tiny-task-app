import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export function AuthProvider ({ children }) {
  const [userLogin, setUserLogin] = useState({
    state: false
  })

  const resetModalProps = {
    state: false,
    id: 0,
    type: `none`
  }

  const [viewModal, setViewModal] = useState(resetModalProps)

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        setUserLogin,
        viewModal,
        setViewModal,
        resetModalProps
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
