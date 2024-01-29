import { SettingsProvider } from '../context/SettingsContext'
import SettingsMain from '../components/SettingsMain'

function Settings () {
  return (
    <SettingsProvider>
      <main>
        <SettingsMain />
      </main>
    </SettingsProvider>
  )
}

export default Settings
