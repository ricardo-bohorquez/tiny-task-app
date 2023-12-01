import { useState } from 'react'
import ConfigInfoAccount from '../components/ConfigInfoAccount'
import ConfigEmail from '../components/ConfigEmail'
import ConfigPassword from '../components/ConfigPassword'
import { SETTINGS_STRING } from '../constants/settingsConstans'

function Settings () {
  const { INFO_ACCOUNT, INFO_EMAIL, INFO_PASS, TITLE } = SETTINGS_STRING
  const [viewConfig, setViewConfig] = useState({
    cfgInfo: false,
    cfgEmail: false,
    cfgPass: false
  })

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
          {viewConfig.cfgInfo ? <ConfigInfoAccount /> : <></>}
          {viewConfig.cfgEmail ? <ConfigEmail /> : <></>}
          {viewConfig.cfgPass ? <ConfigPassword /> : <></>}
        </section>
      </section>
    </main>
  )
}

export default Settings
