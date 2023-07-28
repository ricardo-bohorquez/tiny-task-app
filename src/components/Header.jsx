import icon from '../icons/list-check-solid-light.svg'
import { Link } from 'react-router-dom'

export function Header (params) {
  return (
    <header className='app-header'>
      <img src={icon} />
      <h1>NoTask</h1>
      {/* <Link to={"/tiny-task-app/login"} style={{ fontSize: "20px" }}>
        Login
      </Link> */}
      <div></div>
    </header>
  )
}
