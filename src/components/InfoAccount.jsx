import { useAuth } from '@/context/AuthContext'

function InfoAccount () {
  const { info: { accountCreationDate, loginWithGoogle } } = useAuth()

  return (
    <>
      <ul>
        <li>Fecha de registro: {accountCreationDate}</li>
        <li>Método de registro: {loginWithGoogle ? 'Cuenta de Google' : 'Correo Electrónico'}</li>
      </ul>
    </>
  )
}

export default InfoAccount
