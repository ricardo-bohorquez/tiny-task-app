import ico from '@/icons/list-check-solid-light.svg'
import { CircularProgress } from '@mui/material'

function ModalLoader () {
  return (
    <section className='loader' style={{ display: 'flex' }}>
      <div className='loader-content'>
        <img src={ico} />
        <CircularProgress />
      </div>
    </section>
  )
}

export default ModalLoader
