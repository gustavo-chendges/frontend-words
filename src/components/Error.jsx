import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"

const Error = ({error}) => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <h2>{error.data?.message}</h2>
      <Outlet />
    </Container>
  )
}

export default Error