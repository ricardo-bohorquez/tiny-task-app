import { useLocation } from 'wouter'
import { useAuth } from '../../context/AuthContext'
import { MODAL_RESET_PASS_MESSAGE, MODAL_BUTTON_STRING } from '../../constants/modalsConstants'

function ModalSuccessResetPass () {
  const [, setLocation] = useLocation()
  const { resetModalProps, setViewModal } = useAuth()
  const { RESET_MSG } = MODAL_RESET_PASS_MESSAGE
  const { ACCEPT } = MODAL_BUTTON_STRING

  return (
    <section className='modal-body' style={{ display: 'flex' }}>
      <div className='modal-content modal-login-error'>
        <h3>{RESET_MSG}</h3>
        <button
          onClick={() => {
            setViewModal(resetModalProps)
            setLocation('/login', { replace: true })
          }}
        >
          {ACCEPT}
        </button>
      </div>
    </section>
  )
}

export default ModalSuccessResetPass
