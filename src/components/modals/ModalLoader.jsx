import { MODAL_LOADER_MESSAGE } from '../../constants/modalsConstants'

function ModalLoader () {
  const { LOAD_MSG } = MODAL_LOADER_MESSAGE
  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content'>
        <label>{LOAD_MSG}</label>
      </div>
    </section>
  )
}

export default ModalLoader
