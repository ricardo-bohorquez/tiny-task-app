import { Link } from 'react-router-dom'

export function Home () {
  return (
    <main className='app-home'>
      <p>
        Tiny task es un pequeño proyecto personal que tiene como objetivo
        guardar nuestras tareas diarias de una manera sencilla en el navegador.
      </p>
      <p>
        En un principio, Tiny task almacenaba las tareas creadas de forma local
        en nuestro explorador, de esta manera se corría el riesgo de perder
        nuestras tareas si por cualquier motivo se vaciaban los datos del mismo.
        Esto se está mejorando y se está desarrollando la función de
        almacenamiento de tareas en la nube.
      </p>
      <p>
        <Link to='/register'>Registrate! </Link>, y forma parte
        de nuestra app para que aproveches las mejoras y funcionalidades que se
        vienen en camino, acompañanos en este recorrido desde el inicio.
      </p>
    </main>
  )
}
