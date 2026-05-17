import { Button, Modal } from "react-bootstrap"

const ConfirmDeleteWordsModal = ({ showModal, handleResetDeleteWords, wordsCategories, setWordsCategories, handleDeleteWords, isSuccess }) => {

  const valueInCategory = (e) => {
    return wordsCategories.includes(e.target.value)
  }

  return (
    <Modal show={showModal && isSuccess}>
      <Modal.Header>
        <h2>Deletar palavras?</h2>
      </Modal.Header>

      <Modal.Body>
        <h3 className="fs-5">Selecione as categorias que deseja deletar</h3>
        <div className="d-flex gap-2">
          <input id="nouns" type="checkbox" value="nouns" onChange={(e)=>setWordsCategories(!valueInCategory(e) ? [...wordsCategories, e.target.value]: wordsCategories.filter((value) => value !== e.target.value))}/><label htmlFor="nouns">Substantivos</label>

          <input id="adjectives" type="checkbox" value="adjectives" onChange={(e)=>setWordsCategories(!valueInCategory(e) ? [...wordsCategories, e.target.value]: wordsCategories.filter((value) => value !== e.target.value))}/><label htmlFor="adjectives" >Adjetivos</label>

          <input id="verbs" type="checkbox" value="verbs" onChange={(e)=>setWordsCategories(!valueInCategory(e) ? [...wordsCategories, e.target.value]: wordsCategories.filter((value) => value !== e.target.value))}/><label htmlFor="verbs">Verbos</label>

          <input id="grammatical" type="checkbox" value="grammatical" onChange={(e)=>setWordsCategories(!valueInCategory(e) ? [...wordsCategories, e.target.value]: wordsCategories.filter((value) => value !== e.target.value))}/><label htmlFor="grammatical">Gramática</label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleResetDeleteWords()}>
          Cancelar
        </Button>
        <Button variant="primary" className="my-btn" disabled={!wordsCategories.length} onClick={() => handleDeleteWords()}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDeleteWordsModal