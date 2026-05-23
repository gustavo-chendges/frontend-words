import { Button, Container } from "react-bootstrap"
import useEmailVerified from "../hooks/useEmailVerified"
import { useState } from "react"
import useUserId from "../hooks/useUserId"

import { useDeleteUserMutation } from "../features/users/usersApiSlice"
import { useDeleteWordsMutation } from "../features/users/usersApiSlice"
import { usePasswordMatchMutation } from "../features/auth/authApiSlice"

import ConfirmPasswordModal from "./modals/ConfirmPasswordModal"
import ConfirmDeleteAccountModal from "./modals/ConfirmDeleteAcountModal"
import ConfirmDeleteWordsModal from "./modals/ConfirmDeleteWordsModal"
import UpdateUserForm from "../features/auth/UpdateUserForm"
import MatchPasswordInput from "../features/auth/MatchPasswordInput"

import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setPendingEmail } from '../features/auth/authSlice'
import useEmail from "../hooks/useEmail"
import { useSendVerificationEmailMutation } from "../features/users/usersApiSlice"
import { Spinner } from "react-bootstrap"


const Settings = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { email } = useEmail()
  const { emailVerified } = useEmailVerified()
  const { userId } = useUserId()

  const [showModalPasswordDeleteAccount, setShowModalPasswordDeleteAccount] = useState(false)
  const [modalPasswordDeleteAccount, setModalPasswordDeleteAccount] = useState("")

  const [showModalPasswordDeleteWords, setShowModalPasswordDeleteWords] = useState(false)
  const [modalPasswordDeleteWords, setModalPasswordDeleteWords] = useState("")
  const [wordsCategories, setWordsCategories] = useState([])

  const [showUserUpdateForm, setShowUserUpdateForm] = useState(false)
  const [updateUserPassword, setUpdateUserPassword] = useState("")

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
  const [showDeleteWordsModal, setShowDeleteWordsModal] = useState(false)

  const [deleteUser, {isError: isDeletedUserError, error: deleteUserError}] = useDeleteUserMutation()
  const [deleteWords] = useDeleteWordsMutation()
  const [passwordMatch, { isSuccess: isPasswordSuccess, isLoading: isPasswordLoading, isError: isPasswordError, error: passwordError }] = usePasswordMatchMutation()
  const [sendVerificationEmail] = useSendVerificationEmailMutation()

  const handleResetPasswordModalDeleteAccount = () => {
    setShowModalPasswordDeleteAccount(false)
    setModalPasswordDeleteAccount("")
  }

  const handleResetPasswordModalDeleteWords = () => {
    setShowModalPasswordDeleteWords(false)
    setModalPasswordDeleteWords("")
  }

  const handleResetDeleteWords = () => {
    setWordsCategories([])
    setShowDeleteWordsModal(false)
  }

  const handlePasswordMatch = async (password, onSuccess) => {
    try {
      await passwordMatch({ password: password }).unwrap()
      onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteAccountFlow = async () => {
    handlePasswordMatch(modalPasswordDeleteAccount, () => {
      setShowDeleteAccountModal(true)
      handleResetPasswordModalDeleteAccount()
    })
  }

  const handleDeleteWordsFlow = async () => {
    handlePasswordMatch(modalPasswordDeleteWords, () => {
      setShowDeleteWordsModal(true)
      handleResetPasswordModalDeleteWords()
    })
  }

  const handleUpdateUserFlow = async () => {
    handlePasswordMatch(updateUserPassword, () => {
      setShowUserUpdateForm(true)
    })
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId).unwrap()
      setShowDeleteAccountModal(false)
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteWords = async () => {
    try {
      await deleteWords({ categories: wordsCategories }).unwrap()
      handleResetDeleteWords()
    } catch (err) {
      console.error(err)
    }
  }

  const handleVerifyEmail = async (e) => {
    dispatch(setPendingEmail({ email }))
    await sendVerificationEmail({ email }).unwrap()
  }

  const options = {
    className: "w-80 p-2"
  }

  return (
    <Container className="d-flex justify-content-center align-items-start py-2">

      <ConfirmDeleteAccountModal showModal={showDeleteAccountModal} setShowModal={setShowDeleteAccountModal} handleDeleteUser={handleDeleteUser} isSuccess={isPasswordSuccess} isError={isDeletedUserError} error={deleteUserError}/>

      <ConfirmDeleteWordsModal showModal={showDeleteWordsModal} wordsCategories={wordsCategories} setWordsCategories={setWordsCategories} handleResetDeleteWords={handleResetDeleteWords} handleDeleteWords={handleDeleteWords} isSuccess={isPasswordSuccess} />

      <ConfirmPasswordModal title="Deletar conta?" showModal={showModalPasswordDeleteAccount} modalPassword={modalPasswordDeleteAccount} setModalPassword={setModalPasswordDeleteAccount} handleResetPasswordModal={handleResetPasswordModalDeleteAccount} handleFlow={handleDeleteAccountFlow} isPasswordError={isPasswordError} passwordError={passwordError} />

      <ConfirmPasswordModal title="Deletar palavras?" showModal={showModalPasswordDeleteWords} modalPassword={modalPasswordDeleteWords} setModalPassword={setModalPasswordDeleteWords} handleResetPasswordModal={handleResetPasswordModalDeleteWords} handleFlow={handleDeleteWordsFlow} isPasswordError={isPasswordError} passwordError={passwordError} />

      <div className="w-100 d-flex flex-column justify-content-around min-vh-100 p-3 my-3" style={{ maxWidth: "720px", backgroundColor: "white", borderRadius: "10px" }}>

        {!emailVerified && <>
          <Button as={Link} to="/verify_email" className="my-btn p-2 fs-4 w-100" onClick={(e) => handleVerifyEmail(e)}>Verificar Email</Button>
        </>}

        {/*<fieldset>
          <legend className="fs-3">Display</legend>
          <div className="d-flex w-100 mb-3">
            <label className="w-50 fs-4">Tema</label>
            <select className="w-50" name="" id="">
              <option value="">Light</option>
              <option value="">Dark</option>
            </select>
          </div>
          <div className="d-flex w-100 mb-3">
            <label className="w-50 fs-4">Texto</label>
            <select className="w-50" name="" id="">
              <option value="">Português</option>
              <option value="">Inglês</option>
            </select>
          </div>
        </fieldset>*/}

        {/*<fieldset>
          <legend className="fs-3">Sincronização</legend>
          <div className="d-flex w-100">
            <Button className="my-btn w-80 p-2 fs-5" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}>Sincronizar palavras</Button>
            <Button className="w-20 p-2 fs-4" variant="secondary" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}>
              <FontAwesomeIcon icon={faCircleInfo} />
            </Button>
          </div>
        </fieldset>*/}

        {emailVerified && <>

          <fieldset>
            <legend className="fs-3">Editar usuário</legend>

            {(!isPasswordSuccess || !showUserUpdateForm) &&
              <>
                {isPasswordError ? typeof (passwordError.data.message) === 'object' ?
                  Array.from(Object.keys(passwordError.data.message)).map((err, i) => <p className="fs-4 err_msg" key={`err_${i}`}> {passwordError.data.message[err]}  </p>) : <p className="fs-4 err_msg">{passwordError.data.message}</p> : null
                }

                <label htmlFor="modalPassword" className="fs-5">Digite sua senha atual:</label>
                <div className="d-flex w-100">
                  <MatchPasswordInput password={updateUserPassword} setPassword={setUpdateUserPassword} {...options} />
                  <Button className="my-btn w-20 p-2" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} onClick={() => handleUpdateUserFlow()}>{isPasswordLoading ? <Spinner animation="border"
                  role="status" /> : <>OK</>}</Button>
                </div>
              </>
            }
            {(isPasswordSuccess && showUserUpdateForm) && <UpdateUserForm />}
          </fieldset>
        </>}

        <fieldset>
          <legend className="fs-3">Excluir</legend>
          <div className="d-flex w-100 mb-3">
            <Button className="p-2 fs-5 w-100" variant="danger" onClick={() => setShowModalPasswordDeleteWords(true)}>Excluir palavras personalizadas</Button>
          </div>
          <div className="d-flex w-100 mb-3">
            <Button className="p-2 fs-5 w-100" variant="danger" onClick={() => setShowModalPasswordDeleteAccount(true)}>Excluir conta</Button>
          </div>
        </fieldset>

      </div>
    </Container>
  )
}

export default Settings