import { createContext, useContext, useState } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  return context
}

export function SettingsProvider ({ children }) {
  const [viewConfig, setViewConfig] = useState({
    cfgInfo: false,
    cfgEmail: false,
    cfgPass: false
  })

  const viewInfoAccount = () => {
    setViewConfig({ cfgEmail: false, cfgPass: false, cfgInfo: true })
  }

  const viewEmailInfo = () => {
    setViewConfig({ cfgInfo: false, cfgPass: false, cfgEmail: true })
  }

  const viewPasswordInfo = () => {
    setViewConfig({ cfgInfo: false, cfgEmail: false, cfgPass: true })
  }

  return (
    <SettingsContext.Provider
      value={{
        viewInfoAccount,
        viewEmailInfo,
        viewPasswordInfo,
        viewConfig
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
