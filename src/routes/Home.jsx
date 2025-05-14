import { Link } from 'wouter'
import { useAuth } from '@/context/AuthContext'

function Home () {
  const { user } = useAuth()

  return !user
    ? (
      <main className='app-home'>
        <p>
          Tiny task es un pequeño proyecto personal que tiene como objetivo
          guardar nuestras tareas o notas diarias de una manera sencilla.
        </p>
        <p>
          En un principio, Tiny task almacenaba las tareas creadas de forma local
          en nuestro explorador, de esta manera se corría el riesgo de perderlas
          si por cualquier motivo se vaciaban los datos del mismo.
          Esto cambió y actualmente se encuentra funcionando el almacenamiento en la nube,
          nos podemos registrar con un correo electrónico o bien iniciar sesión con nuestra cuenta
          de Google.
        </p>
        <p>
          <Link href='/register'>Registrate</Link> y forma parte
          de nuestra app para que aproveches nuestras pequeñas funciones y nos ayudes
          a mejorar.
        </p>
      </main>
      )
    : (
      <main className='app-home'>
        <p>
          Tiny task es un pequeño proyecto personal que tiene como objetivo
          guardar nuestras tareas o notas diarias de una manera sencilla.
        </p>
        <p>
          En un principio, Tiny task almacenaba las tareas creadas de forma local
          en nuestro explorador, de esta manera se corría el riesgo de perderlas
          si por cualquier motivo se vaciaban los datos del mismo.
          Esto cambió y actualmente se encuentra funcionando el almacenamiento en la nube,
          nos podemos registrar con un correo electrónico o bien iniciar sesión con nuestra cuenta
          de Google.
        </p>
        <p>Si encuentras alguna falla en la aplicación o quieres dar alguna sugerencia déjanos
          un <Link href='/'>mensaje</Link> y lo estaremos atendiendo lo más pronto posible.
        </p>
      </main>
      )
}

export default Home
