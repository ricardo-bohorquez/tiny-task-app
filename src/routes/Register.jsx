import { useState } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../configFirebase'
import { useAuth } from '../context/AuthContext'
import ModalRegisterError from '../components/modals/ModalRegisterError'
import ModalSuccesRegister from '../components/modals/ModalSuccessRegister'
import ModalLoader from '../components/modals/ModalLoader'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('es')

export function Register () {
  const { viewModal, setViewModal } = useAuth()

  const emptyParams = {
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  }
  const [userParams, setUserParams] = useState(emptyParams)

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

  function handleData ({ target: { name, value } }) {
    setUserParams({ ...userParams, [name]: value })
  }

  async function handleRegister (e) {
    e.preventDefault()
    if (
      userParams.email === userParams.confirmEmail &&
      userParams.password === userParams.confirmPassword
    ) {
      setViewModal({ ...viewModal, state: true, type: 'loader' })
      const docRef = doc(db, 'users', userParams.email)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists())
        setViewModal({ ...viewModal, state: true, type: 'reg-error' })
      else {
        const currentDate = dayjs().format('DD/MM/YYYY')
        setUserData({
          ...userData,
          password: userParams.password,
          accountCreationDate: currentDate
        })
        await setDoc(doc(db, 'users', userParams.email), userData)
        setViewModal({ ...viewModal, state: true, type: 'success-reg' })
      }
    } else {
      alert('El correo y la contraseña deben coincidir')
    }
  }

  return (
    <main>
      <section className='title-login-register'>
        <h2 style={{ height: 'fit-content', margin: 'auto' }}>Registrate</h2>
      </section>
      <form className='register-form' onSubmit={handleRegister}>
        <input
          type='email'
          name='email'
          placeholder='Ingrese su correo de registro '
          onChange={handleData}
          required
        />
        <input
          type='email'
          name='confirmEmail'
          placeholder='Repita su correo'
          onChange={handleData}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Ingrese su clave'
          onChange={handleData}
          required
          minLength={6}
          maxLength={6}
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Repita su clave'
          onChange={handleData}
          required
          minLength={6}
          maxLength={6}
        />
        <button>Registrarse</button>
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
