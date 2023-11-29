import ConfigInfoAccount from '../components/ConfigInfoAccount'
import ConfigEmail from '../components/ConfigEmail'
import ConfigPassword from '../components/ConfigPassword'
import { useState } from 'react'

function Settings () {
  const [viewConfig, setViewConfig] = useState({
    cfgInfo: false,
    cfgEmail: false,
    cfgPass: false
  })

  return (
    <main>
      <h2>Configuración</h2>
      <aside>
        <ul>
          <li onClick={() => setViewConfig({ cfgEmail: false, cfgPass: false, cfgInfo: true })}>Información de la cuenta</li>
          <li onClick={() => setViewConfig({ cfgInfo: false, cfgPass: false, cfgEmail: true })}>Correo Electrónico</li>
          <li onClick={() => setViewConfig({ cfgInfo: false, cfgEmail: false, cfgPass: true })}>Contraseña</li>
        </ul>
      </aside>
      <section>
        {viewConfig.cfgInfo ? <ConfigInfoAccount /> : <></>}
        {viewConfig.cfgEmail ? <ConfigEmail /> : <></>}
        {viewConfig.cfgPass ? <ConfigPassword /> : <></>}
      </section>
    </main>
  )
}

export default Settings
