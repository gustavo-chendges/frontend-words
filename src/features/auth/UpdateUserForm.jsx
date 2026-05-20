import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { useUpdateUserMutation } from "../users/usersApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useNavigate } from "react-router-dom"

const UpdateUserForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [updateUser, isLoading] = useUpdateUserMutation()

    const canSave = Boolean(username.trim() || email.trim() || password.trim() || confirmPassword.trim())
    const passwordMatch = password === confirmPassword

    const handleUpdateUser = async () => {

        try {
            let updatedUser = {}

            if (username.trim()) updatedUser.username = username
            if (email.trim()) updatedUser.email = email
            if (password.trim()) updatedUser.password = password

            const result = await updateUser({ ...updatedUser }).unwrap()

            if (result.accessToken) {
                dispatch(setCredentials({ accessToken: result.accessToken }))
            }

            navigate('/home')
        } catch (err){
            console.error(err)
        }
    }

    return (
        <Form style={{ boxShadow: "0px" }}>
            <Form.Group className="d-flex w-100 mb-3">
                <Form.Control className="fs-5" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Informe o novo nome de usuário..." />
            </Form.Group>

            <Form.Group className="d-flex w-100 mb-3">
                <Form.Control className="fs-5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Informe o novo email..." />
            </Form.Group>

            <Form.Group className="d-flex w-100 mb-3">
                <Form.Control className="fs-5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Informe a nova senha..." />
            </Form.Group>

            <Form.Group className="d-flex w-100 mb-3">
                <Form.Control className="fs-5" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme a nova senha..." />
            </Form.Group>
            {!passwordMatch && confirmPassword && <p>As senhas não coincidem</p>}

            <Button className="my-btn w-100" disabled={!canSave} onClick={() => handleUpdateUser()}>
               { isLoading? <>Enviando</> : <>Enviar</>}
            </Button>
        </Form>
    )
}

export default UpdateUserForm