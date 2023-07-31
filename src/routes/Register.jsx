import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../configFirebase.js'

export function Register () {
  const [user, setUser] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPasword: ''
  })

  function handleData ({ target: { name, value } }) {
    setUser({ ...user, [name]: value })
  }

  async function handleRegister (e) {
    e.preventDefault();
    await setDoc(doc(db, 'data', 'users'), user)
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
        />
        <input
          type='email'
          name='confirmEmail'
          placeholder='Repita su correo'
          onChange={handleData}
        />
        <input
          type='password'
          name='password'
          placeholder='Ingrese su clave'
          onChange={handleData}
        />
        <input
          type='password'
          name='confirmPasword'
          placeholder='Repita su clave'
          onChange={handleData}
        />
        <button>Registrarse</button>
      </form>
    </main>
  )
}
