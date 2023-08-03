import { Link } from 'react-router-dom'
function AreLogged () {
  return (
    <main>
      <section className='are-logged'>
        <h4>Ya tiene una sesión activa</h4>
        <p>Haga click en el siguiente enlace para dirigirse al dashboard</p>
        <Link to={'/tiny-task-app/dashboard'}>Dashboard</Link>
      </section>
    </main>
  )
}
export default AreLogged
