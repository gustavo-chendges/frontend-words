import { Button, Modal } from 'react-bootstrap'

const ConfirmDeleteAccountModal = ({ showModal, setShowModal, isSuccess, handleDeleteUser, isError, error }) => {

  return (
    <Modal show={showModal && isSuccess}>
      <Modal.Header>
        <h2>Confirmar</h2>
      </Modal.Header>
      <Modal.Body className="fs-5">
        {isError ? <p className="fs-4 err_msg">{error.data}</p> : null}
        <p>Você tem certeza que deseja deletar sua conta? Essa operação não pode ser desfeita</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" className="my-btn" onClick={() => handleDeleteUser()}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDeleteAccountModal