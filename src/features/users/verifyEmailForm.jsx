import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSendVerificationEmailMutation } from './usersApiSlice'
import { useValidateEmailMutation } from './usersApiSlice'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setCredentials, clearPendingEmail } from '../auth/authSlice'
import useEmailVerified from '../../hooks/useEmailVerified'


const VerifyEmailForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { emailVerified } = useEmailVerified()

  const [verifyToken, setVerifyToken] = useState("")

  const [sendVerificationEmail, { isLoading: isVerificationEmailLoading }] = useSendVerificationEmailMutation()
  const [validateEmail, { isLoading: isValidateEmailLoading }] = useValidateEmailMutation()

  const email = useSelector(state => state.auth.pendingEmail)

  const handleSendVerifyEmail = async (e) => {
    e.preventDefault()

    try {
      await sendVerificationEmail({ email }).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  const handleValidateEmail = async (e) => {
    e.preventDefault()

    try {
      const result = await validateEmail({ email, verifyToken }).unwrap()

      if (result.accessToken) {
        dispatch(setCredentials({ accessToken: result.accessToken }))
      }
      
      dispatch(clearPendingEmail())
      navigate('/home')
    } catch (err) {
      console.error(err)
    }
  }

  const content = !emailVerified ? <Container>
    <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ boxShadow: "0px 0px 0px transparent" }}>

      <Form.Group className="w-75 d-flex flex-column my-3">
        <Form.Label className="fs-3">
          Verificar de email
        </Form.Label>
        <Form.Control
          type="text"
          className="w-100 border-2 border-black fs-4"
          placeholder="Informe o código..."
          value={verifyToken}
          onChange={(e) => setVerifyToken(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="w-75 d-flex flex-column">
        <Form.Label className="fs-6">
          Enviamos um código de verificação para {email}
        </Form.Label>

      </Form.Group>

      <Form.Group className="w-100 d-flex flex-column align-items-center my-5">
        <Button className="my-btn w-75 fs-4 p-2 my-3" onClick={(e) => handleSendVerifyEmail(e)}>
          {isVerificationEmailLoading ? <p>Enviando...</p> : <p>Reenviar email</p>}
        </Button>
        <Button className="my-btn w-75 fs-4 p-2" onClick={(e) => handleValidateEmail(e)}>
          {isValidateEmailLoading ? <p>Validando...</p> : <p>Verificar email</p>}
        </Button>
        <Link className='w-75 fs-4 p-2' to={`/home`}>Agora não</Link>
      </Form.Group>
    </Form>
  </Container> : <Navigate to="/home" />


  return content
}

export default VerifyEmailForm