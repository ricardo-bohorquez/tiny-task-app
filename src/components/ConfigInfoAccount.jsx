import { db } from '../../configFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

function ConfigInfoAccount () {
  const { user: { uid } } = useAuth()
  const docRef = doc(db, 'users', uid)
  const docSnap = getDoc(docRef).then(res => console.log(res)).then(data => data)
  const { accountCreationDate } = docSnap

  return (
    <section>
      <ul>
        <li>Método de registro: {accountCreationDate}</li>
        <li>Fecha de registro:</li>
        <li>Método de registro:</li>
      </ul>
    </section>
  )
}

export default ConfigInfoAccount
