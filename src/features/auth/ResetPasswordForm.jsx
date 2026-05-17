import { Container } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"

import { useState } from "react"
import { useResetPasswordMutation } from "./authApiSlice"
import { useSelector, useDispatch} from "react-redux"
import { clearPendingEmail } from "./authSlice"
import { useNavigate } from "react-router-dom"

const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const passwordMatch = newPassword === confirmNewPassword
  const [resetPassword, {isLoading}] = useResetPasswordMutation()

  const email = useSelector(state => state.auth.pendingEmail)

  const isValidPassword = (password) => {
    if(password.length < 8 || !passwordMatch){
      return false
    }

    return true
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    try{
      await resetPassword({email, newPassword}).unwrap()
      dispatch(clearPendingEmail())
      navigate('/')
    } catch(err){
      console.error(err)
    }
  }

  const canSave = [isValidPassword(newPassword), isValidPassword(confirmNewPassword), passwordMatch].every(Boolean)

  return (
    <Container fluid>
      <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ boxShadow: "0px 0px 0px transparent" }}>
        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Password
          </Form.Label>
          <Form.Control
            className="w-100 border-2 border-black fs-4"
            type="password"
            placeholder="Enter the password (minimum 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Confirm Password
          </Form.Label>
          <Form.Control
            className="w-100 border-2 border-black fs-4"
            type="password"
            placeholder="Enter the password again"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {confirmNewPassword && !passwordMatch && (<p>The passwords do not match!</p>)}
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Button className="my-btn w-100 fs-4 d-flex flex-column align-items-center" onClick={handleResetPassword} disabled={!canSave}>
            {isLoading ? <p className="m-0">Alterando...</p> : <p className="m-0">Alterar Senha</p>}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default ResetPasswordForm