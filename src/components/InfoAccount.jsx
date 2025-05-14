import { useAuth } from '@/context/AuthContext'
import { SETTINGS_STRING } from '@/constants/settingsConstans'

function InfoAccount () {
  const { info: { accountCreationDate, loginWithGoogle } } = useAuth()
  const { REG_DATE, REG_METHOD, TYPE_EMAIL, TYPE_GOOGLE } = SETTINGS_STRING
  return (
    <>
      <ul>
        <li>{REG_DATE}: {accountCreationDate}</li>
        <li>{REG_METHOD}: {loginWithGoogle ? TYPE_GOOGLE : TYPE_EMAIL}</li>
      </ul>
    </>
  )
}

export default InfoAccount
