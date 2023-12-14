import { useState, lazy, Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import { SETTINGS_STRING } from '../constants/settingsConstans'

function Settings () {
  const { INFO_ACCOUNT, INFO_EMAIL, INFO_PASS, TITLE } = SETTINGS_STRING
  const [viewConfig, setViewConfig] = useState({
    cfgInfo: false,
    cfgEmail: false,
    cfgPass: false
  })

  const InfoAccount = lazy(() => import('../components/ConfigInfoAccount'))
  const ConfigEmail = lazy(() => import('../components/ConfigEmail'))
  const ConfigPassword = lazy(() => import('../components/ConfigPassword'))

  return (
    <main>
      <h2>{TITLE}</h2>
      <section className='settings-block'>
        <aside className='aside-settings'>
          <ul>
            <li onClick={() => setViewConfig({ cfgEmail: false, cfgPass: false, cfgInfo: true })}>{INFO_ACCOUNT}</li>
            <li onClick={() => setViewConfig({ cfgInfo: false, cfgPass: false, cfgEmail: true })}>{INFO_EMAIL}</li>
            <li onClick={() => setViewConfig({ cfgInfo: false, cfgEmail: false, cfgPass: true })}>{INFO_PASS}</li>
          </ul>
        </aside>
        <section className='frame-settings'>
          <Suspense fallback={<CircularProgress style={{}} />}>
            {viewConfig.cfgInfo ? <InfoAccount /> : <></>}
            {viewConfig.cfgEmail ? <ConfigEmail /> : <></>}
            {viewConfig.cfgPass ? <ConfigPassword /> : <></>}
          </Suspense>
        </section>
      </section>
    </main>
  )
}

export default Settings
