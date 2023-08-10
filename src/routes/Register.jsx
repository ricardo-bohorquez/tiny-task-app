import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { db } from '../configFirebase'
import { doc, setDoc } from 'firebase/firestore'
import ModalRegisterError from '../components/modals/ModalRegisterError'
import ModalLoader from '../components/modals/ModalLoader'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

export function Register () {
  const { signUp, resetModalProps, viewModal, setViewModal, user } = useAuth()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPass, setUserPass] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errorEmail, setErrorEmail] = useState({})
  const [errorPass, setErrorPass] = useState({})
  const [errorConfirmPass, setErrorConfirmPass] = useState({})
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
      setViewModal(resetModalProps)
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
    else if (userPass.length < 6 || userPass.length > 30) {
      setErrorPass({ border: '1px solid red' })
      setReady({ ...ready, psw: false })
    } else {
      setErrorPass({ border: '1px solid green' })
      setReady({ ...ready, psw: true })
    }
  }, [userPass, confirmPass])

  useEffect(() => {
    if (confirmPass === '') setErrorConfirmPass({ border: 'none' })
    else if (confirmPass.length < 6 || confirmPass.length > 30) {
      setErrorConfirmPass({ border: '1px solid red' })
      setReady({ ...ready, cpsw: false })
    } else if (confirmPass !== userPass) {
      setErrorConfirmPass({ border: '1px solid red' })
      setReady({ ...ready, cpsw: false })
    } else {
      setErrorConfirmPass({ border: '1px solid green' })
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

  return user ? (
    <Navigate to='/tiny-task-app/dashboard' />
  ) : (
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
          maxLength={30}
        />
        {displayLabel ? (
          <label>La contraseña debe contar con al menos 6 caracteres</label>
        ) : (
          <></>
        )}
        <input
          type='password'
          name='confirmPassword'
          placeholder='Repita la clave ingresada'
          onChange={handleFields}
          value={confirmPass}
          style={errorConfirmPass}
          required
          minLength={6}
          maxLength={30}
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
