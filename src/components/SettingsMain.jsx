import { lazy, Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import { SETTINGS_STRING } from '@/constants/settingsConstans'
import { useSettings } from '@/context/SettingsContext'

const InfoAccount = lazy(() => import('@/components/InfoAccount'))
const ConfigEmail = lazy(() => import('@/components/ConfigEmail'))
const ConfigPassword = lazy(() => import('@/components/ConfigPassword'))

function SettingsMain () {
  const { viewInfoAccount, viewEmailInfo, viewPasswordInfo, viewConfig: { cfgEmail, cfgInfo, cfgPass } } = useSettings()
  const { INFO_ACCOUNT, INFO_EMAIL, INFO_PASS, TITLE } = SETTINGS_STRING
  return (
    <>
      <h2>{TITLE}</h2>
      <section className='settings-block'>
        <aside className='aside-settings'>
          <ul>
            <li onClick={viewInfoAccount}>{INFO_ACCOUNT}</li>
            <li onClick={viewEmailInfo}>{INFO_EMAIL}</li>
            <li onClick={viewPasswordInfo}>{INFO_PASS}</li>
          </ul>
        </aside>
        <section className='frame-settings'>
          <Suspense fallback={<CircularProgress />}>
            {cfgInfo ? <InfoAccount /> : <></>}
            {cfgEmail ? <ConfigEmail /> : <></>}
            {cfgPass ? <ConfigPassword /> : <></>}
          </Suspense>
        </section>
      </section>
    </>
  )
}

export default SettingsMain
