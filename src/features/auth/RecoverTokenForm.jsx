import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

import { useSendRecoverPasswordEmailMutation } from './authApiSlice'
import { useRecoverPasswordMutation } from './authApiSlice'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'

const RecoverTokenForm = () => {
  const navigate = useNavigate()

  const [recoverToken, setRecoverToken] = useState("")

  const [sendRecoverPasswordEmail, { isLoading: isRecoverEmailLoading }] = useSendRecoverPasswordEmailMutation()
  const [recoverPassword, { isLoading: isRecoverPasswordLoading }] = useRecoverPasswordMutation()

  const email = useSelector(state => state.auth.pendingEmail)

  const handleSendRecoverEmail = async (e) => {
    e.preventDefault()

    try {
      await sendRecoverPasswordEmail({ email }).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  const handleRecoverPassword = async (e) => {
    e.preventDefault()

    try {
      await recoverPassword({ email, recoverToken }).unwrap()
      navigate('/reset_password')
    } catch (err) {
      console.error(err)
    }
  }

  let content = email ? <Container>
    <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ boxShadow: "0px 0px 0px transparent" }}>

      <Form.Group className="w-75 d-flex flex-column my-3">
        <Form.Label className="fs-3">
          Recuperar senha
        </Form.Label>
        <Form.Control
          type="text"
          className="w-100 border-2 border-black fs-4"
          placeholder="Informe o código..."
          value={recoverToken}
          onChange={(e) => setRecoverToken(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="w-75 d-flex flex-column">
        <Form.Label className="fs-6">
          Enviamos um código de recuperação para {email}
        </Form.Label>

      </Form.Group>

      <Form.Group className="w-100 d-flex flex-column align-items-center my-5">
        <Button className="my-btn w-75 fs-4 p-2 my-3" onClick={(e) => handleSendRecoverEmail(e)}>
          {isRecoverEmailLoading ? <>Enviando...</> : <>Reenviar email</>}
        </Button>
        <Button className="my-btn w-75 fs-4 p-2" onClick={(e) => handleRecoverPassword(e)}>
          {isRecoverPasswordLoading ? <>Verificando...</> : <>Verificar código</>}
        </Button>
      </Form.Group>
    </Form>
  </Container> : <Navigate to="/forgot_password" />


  return content
}

export default RecoverTokenForm