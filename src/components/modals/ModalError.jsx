import { useAuth } from '../../context/AuthContext'
import error from '../../icons/circle-xmark-regular.svg'
import { MODAL_BUTTON_STRING, MODAL_ERROR_MESSAGE } from '../../constants/modalsConstants'
import { ERROR_STRING } from '../../constants/errorsConstants'

function ModalError ({ type = '' }) {
  const { resetModalProps, setViewModal } = useAuth()
  const { EMAIL_IN_USE, USER_NOT_FOUND } = ERROR_STRING
  const { IN_USE_MSG, NOT_FOUND_MSG } = MODAL_ERROR_MESSAGE
  const { ACCEPT } = MODAL_BUTTON_STRING

  return (
    <section
      className='modal-body'
      id='modal-error'
      style={{ display: 'flex' }}
    >
      <div className='modal-content'>
        {type === USER_NOT_FOUND ? <h3>{NOT_FOUND_MSG}</h3> : <></>}
        {type === EMAIL_IN_USE ? <h3>{IN_USE_MSG}</h3> : <></>}
        <img src={error} style={{ width: '50px' }} />
        <button
          onClick={() => setViewModal(resetModalProps)}
          id='acceptError'
          autoFocus
        >
          {ACCEPT}
        </button>
      </div>
    </section>
  )
}

export default ModalError
