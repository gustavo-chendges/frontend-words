import { Container, Row, Col } from "react-bootstrap"
import WordsOptionCard from "./WordsOptionCard"

const WordsMenu = () => {
  return (
    <Container className="min-vh-100 d-flex align-items-center flex-grow-1 m-3">
      <Row className="w-100 justify-content-center g-4">
        <Col xs={12} sm={6} md={3}>
          <WordsOptionCard link="/words/nouns" from="words" title="Nouns" subtitle="Nomes" />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <WordsOptionCard link="/words/adjectives" from="home" title="Adjectives" subtitle="Adjetivos" />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <WordsOptionCard link="/words/verbs" from="home" title="Verbs" subtitle="Verbos" />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <WordsOptionCard link="/words/grammatical" from="home" title="Grammatical" subtitle="Gramática" />
        </Col>
      </Row>
    </Container>
  )
}

export default WordsMenu