export function Login () {
  
  return (
    <main>
      <section className='title-login-register'>
        <h2 style={{ height: 'fit-content', margin: 'auto' }}>Inicia sesión</h2>
      </section>
      <form action='' className='login-form'>
        <input type='text' placeholder='Correo electrónico' />
        <input type='password' name='' id='' placeholder='Contraseña' />
        <button>Ingresar</button>
      </form>
    </main>
  )
}
