import { useState } from 'react'

export function Register () {
  const [user, setUser] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPasword: ''
  })

  function handleRegisterData ({ target: { name, value } }) {
    setUser({ ...user, [name]: value })
  }

  return (
    <main>
      <section className='title-login-register'>
        <h2 style={{ height: 'fit-content', margin: 'auto' }}>Registrate</h2>
      </section>
      <form action='' className='register-form'>
        <input
          type='email'
          name='email'
          placeholder='Ingrese su correo de registro '
          onChange={handleRegisterData}
        />
        <input
          type='email'
          name='confirmEmail'
          placeholder='Repita su correo'
          onChange={handleRegisterData}
        />
        <input
          type='password'
          name='password'
          placeholder='Ingrese su clave'
          onChange={handleRegisterData}
        />
        <input
          type='password'
          name='confirmPasword'
          placeholder='Repita su clave'
          onChange={handleRegisterData}
        />
        <button>Registrarse</button>
      </form>
    </main>
  )
}
