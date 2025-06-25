import { lazy, Suspense } from 'react'
import { CircularProgress } from '@mui/material'

import { useSettings } from '@/context/SettingsContext'

const InfoAccount = lazy(() => import('@/components/InfoAccount'))
const ConfigEmail = lazy(() => import('@/components/ConfigEmail'))
const ConfigPassword = lazy(() => import('@/components/ConfigPassword'))

function SettingsMain () {
  const {
    viewInfoAccount,
    viewEmailInfo,
    viewPasswordInfo,
    viewConfig: { cfgEmail, cfgInfo, cfgPass }
  } = useSettings()

  return (
    <>
      <h2>Configuración</h2>
      <section className='settings-block'>
        <aside className='aside-settings'>
          <ul>
            <li onClick={viewInfoAccount}>Información de la cuenta</li>
            <li onClick={viewEmailInfo}>Correo</li>
            <li onClick={viewPasswordInfo}>Contraseña</li>
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
