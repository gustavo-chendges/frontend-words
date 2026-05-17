import { Container, Spinner } from "react-bootstrap"

const Loading = () => {
  return (
    
   <Container className="d-flex justify-content-center align-items-center vh-100">
      <Spinner
        animation="border"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      />
    </Container>
  )
}

export default Loading