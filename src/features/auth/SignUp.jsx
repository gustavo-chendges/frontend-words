import { Container } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useCreateUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { setPendingEmail } from '../auth/authSlice'
import { useDispatch } from 'react-redux'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const passwordMatch = password === confirmPassword

  const [createUser, { isSuccess, isLoading, isError, error }] = useCreateUserMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPendingEmail({email}))
      navigate({ pathname: '/verify_email', replace: true })
    }
  }, [isSuccess, navigate])

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
  }

  const isValidUsername = (username) => {
    if(username.length < 4){
      return false
    }

    return true
  }

  const isValidPassword = (password) => {
    if(password.length < 8 || !passwordMatch){
      return false
    }

    return true
  }

  const canSave = [isValidEmail(email), isValidUsername(username), isValidPassword(password)].every(Boolean)

  const handleSaveUser = async (e) => {
    e.preventDefault()

    if (canSave) {
      await createUser({ email, username, password }).unwrap()
    }
  }

  return (
    <Container fluid>

      <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ boxShadow: "0px 0px 0px transparent" }}>
        {isError ? typeof(error.data.message) === 'object' ? 
          Array.from(Object.keys(error.data.message)).map((err, i) => <p className="fs-4 err_msg" key={`err_${i}`}> {error.data.message[err]}  </p>) : <p className="fs-4 err_msg">{error.data.message}</p> : null
        }

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Email
          </Form.Label>
          <Form.Control
            type="text"
            className="w-100 border-2 border-black fs-4"
            placeholder="Enter the email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            className="w-100 border-2 border-black fs-4"
            placeholder="Enter the username (minimum 4 characters)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Password
          </Form.Label>
          <Form.Control
            className="w-100 border-2 border-black fs-4"
            type="password"
            placeholder="Enter the password (minimum 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && !passwordMatch && (<p>As senhas não coincidem</p>)}
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Button className="my-btn w-100 fs-4 d-flex flex-column align-items-center" onClick={handleSaveUser} disabled={!canSave}>
            {isLoading ? <p className="m-0">Loading...</p> : <p className="m-0">Sign up</p>}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default SignUp