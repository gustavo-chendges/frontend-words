import { Button, Modal } from "react-bootstrap"
import MatchPasswordInput from "../../features/auth/MatchPasswordInput"

const ConfirmPasswordModal = ({ title, showModal, modalPassword, setModalPassword, handleResetPasswordModal, handleFlow, isPasswordError, passwordError }) => {
  return (
    <Modal show={showModal}>



      <Modal.Header>
        <h2>{title}</h2>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column align-items-center w-100 gap-2">
        {isPasswordError ? typeof (passwordError.data.message) === 'object' ?
          Array.from(Object.keys(passwordError.data.message)).map((err, i) => <p className="fs-4 err_msg" key={`err_${i}`}> {passwordError.data.message[err]}  </p>) : <p className="fs-4 err_msg">{passwordError.data.message}</p> : null
        }
        <label htmlFor="modalPassword" className="fs-5">Digite sua senha atual:</label>
        <MatchPasswordInput password={modalPassword} setPassword={setModalPassword} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleResetPasswordModal()}>
          Cancelar
        </Button>
        <Button variant="primary" className="my-btn" disabled={!modalPassword} onClick={() => handleFlow()}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmPasswordModal