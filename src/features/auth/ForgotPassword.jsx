import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendRecoverPasswordEmailMutation } from './authApiSlice'

import { useDispatch } from 'react-redux'
import { setPendingEmail } from './authSlice'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ email, setEmail ] = useState("")

  const [sendRecoverPasswordEmail, {isLoading, isError, error}] = useSendRecoverPasswordEmailMutation()

  const handleSendRecoverEmail = async (e) => {
    e.preventDefault()

    try {
      await sendRecoverPasswordEmail({ email }).unwrap()
      dispatch(setPendingEmail({email}))
      navigate('/recover_password')
    } catch(err){
      console.error(err)
    }
  }

  return (
    <Container>
      <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ boxShadow: "0px 0px 0px transparent" }}>

        {isError ? typeof(error.data.message) === 'object' ? 
          Array.from(Object.keys(error.data.message)).map((err, i) => <p className="fs-4 err_msg" key={`err_${i}`}> {error.data.message[err]}  </p>) : <p className="fs-4 err_msg">{error.data.message}</p> : null
        }

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Recuperar senha
          </Form.Label>
          <Form.Control
            type="text"
            className="w-100 border-2 border-black fs-4"
            placeholder="Informe o email cadastrado..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column">
          <Form.Label className="fs-6">
            Enviaremos um código de recuperação ao email informado
          </Form.Label>

        </Form.Group>

        <Form.Group className="w-100 d-flex flex-column align-items-center my-5">
          <Button className="my-btn w-75 fs-4 p-2" onClick={(e) => handleSendRecoverEmail(e)}>
            {isLoading? <>Enviando...</>: <>Enviar código de recuperação</>}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default ForgotPassword