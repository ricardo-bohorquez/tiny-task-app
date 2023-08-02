import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import ModalRegisterError from '../components/modals/ModalRegisterError'
import ModalSuccesRegister from '../components/modals/ModalSuccessRegister'
import ModalLoader from '../components/modals/ModalLoader'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

export function Register () {
  const { signUp, resetModalProps, viewModal, setViewModal } = useAuth()

  const [userEmail, setUserEmail] = useState('')
  const [userPass, setUserPass] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const [errConfPass, setErrConfPass] = useState({})
  const [displayLabel, setDisplayLabel] = useState(false)
  const [ready, setReady] = useState({
    em: false,
    psw: false,
    cpsw: false
  })

  const accountCreationDate = dayjs().format('DD/MM/YYYY')

  const emptyData = {
    password: '',
    accountCreationDate: '',
    registrationConfirmed: false,
    listOfTask: {
      pending: [],
      performed: []
    }
  }
  const [userData, setUserData] = useState(emptyData)

  const resetFields = () => {
    setUserEmail('')
    setConfirmEmail('')
    setUserPass('')
    setConfirmPass('')
  }

  const handleFields = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        setUserEmail(value)
        break
      case 'confirmEmail':
        setConfirmEmail(value)
        break
      case 'password':
        setUserPass(value)
        break
      case 'confirmPassword':
        setConfirmPass(value)
        break
    }
  }

  const handleRegister = async (e, email, pass) => {
    e.preventDefault()
    setViewModal({ ...viewModal, state: true, type: 'loader' })
    try {
      await signUp(email, pass)
      setViewModal({ ...viewModal, state: true, type: 'success-reg' })
    } catch ({ code }) {
      setViewModal(resetModalProps)
      code === 'auth/email-already-in-use' &&
        setViewModal({ ...viewModal, state: true, type: 'reg-error' })
      resetFields()
      setReady({
        em: false,
        psw: false,
        cpsw: false
      })
    }
  }

  useEffect(() => {
    if (userEmail === '' && confirmEmail === '')
      setErrorEmail({ border: 'none' })
    else if (userEmail !== confirmEmail) {
      setErrorEmail({ border: '1px solid red' })
      setReady({ ...ready, em: false })
    } else {
      setErrorEmail({ border: '1px solid green' })
      setReady({ ...ready, em: true })
    }
  }, [userEmail, confirmEmail])

  useEffect(() => {
    if (userPass === '') setErrorPass({ border: 'none' })
    else if (userPass.length < 6 || userPass.length > 6) {
      setErrorPass({ border: '1px solid red' })
      setReady({ ...ready, psw: false })
    } else {
      setErrorPass({ border: '1px solid green' })
      setReady({ ...ready, psw: true })
    }
  }, [userPass, confirmPass])

  useEffect(() => {
    if (confirmPass === '') setErrConfPass({ border: 'none' })
    else if (confirmPass.length < 6 || confirmPass.length > 6) {
      setErrConfPass({ border: '1px solid red' })
      setReady({ ...ready, cpsw: false })
    } else if (confirmPass !== userPass) {
      setErrConfPass({ border: '1px solid red' })
      setReady({ ...ready, cpsw: false })
    } else {
      setErrConfPass({ border: '1px solid green' })
      setReady({ ...ready, cpsw: true })
    }
  }, [confirmPass, userPass])

  useEffect(() => {
    if (ready.em && ready.psw && ready.cpsw)
      setUserData({
        ...userData,
        password: userPass,
        accountCreationDate
      })
  }, [ready])

  return (
    <main>
      <section className='title-login-register'>
        <h2 style={{ height: 'fit-content', margin: 'auto' }}>Registrate</h2>
      </section>
      <form
        className='register-form'
        onSubmit={e => handleRegister(e, userEmail, userPass)}
      >
        <input
          type='email'
          name='email'
          placeholder='Ingrese su correo de registro '
          onChange={handleFields}
          value={userEmail}
          required
        />
        <input
          type='email'
          name='confirmEmail'
          placeholder='Repita el correo ingresado'
          onChange={handleFields}
          value={confirmEmail}
          style={errorEmail}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Ingrese su clave de acceso'
          onChange={handleFields}
          onFocus={() => setDisplayLabel(true)}
          onBlur={() => setDisplayLabel(false)}
          value={userPass}
          style={errorPass}
          required
          minLength={6}
          maxLength={6}
        />
        {displayLabel ? (
          <label>La contraseña debe contar con 6 caracteres</label>
        ) : (
          <></>
        )}
        <input
          type='password'
          name='confirmPassword'
          placeholder='Repita la clave ingresada'
          onChange={handleFields}
          value={confirmPass}
          style={errConfPass}
          required
          minLength={6}
          maxLength={6}
        />
        {ready.em && ready.psw && ready.cpsw ? (
          <button>Registrarse</button>
        ) : (
          <label>Esperando datos correctos...</label>
        )}
        {viewModal.state === true && viewModal.type === 'reg-error' ? (
          <ModalRegisterError />
        ) : (
          <></>
        )}
        {viewModal.state === true && viewModal.type === 'success-reg' ? (
          <ModalSuccesRegister />
        ) : (
          <></>
        )}
        {viewModal.state === true && viewModal.type === 'loader' ? (
          <ModalLoader />
        ) : (
          <></>
        )}
      </form>
    </main>
  )
}
