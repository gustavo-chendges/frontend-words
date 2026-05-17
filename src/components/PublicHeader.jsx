import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { useLocation } from "react-router-dom"

const PublicHeader = () => {
  const location = useLocation()

  return (
    <Navbar expand="sm" className="w-100 vh-10 d-flex justify-content-around">
    <Navbar.Brand href="#" className='mx-3 fs-1'>LangApp</Navbar.Brand>

      {(!["/", "/recover_password", "/reset_password"].includes(location.pathname)) && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
      {
        (["/login",  "/forgot_password"].includes(location.pathname)) && <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#signup">Não possui conta? Cadastre-se</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      }
      {
        (['/signup'].includes(location.pathname)) && <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#login">Já possui cadastro?</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      }

    </Navbar>
  )
}

export default PublicHeader