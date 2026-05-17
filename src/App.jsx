import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const LandPage = lazy(() => import('./components/LandPage'))
const Settings = lazy(() => import('./components/Settings'))
const About = lazy(() => import('./components/About'))
const Login = lazy(() => import('./features/auth/Login'))
const SignUp = lazy(() => import('./features/auth/SignUp'))
const ForgotPassword = lazy(() => import('./features/auth/ForgotPassword'))
const WordsMenu = lazy(() => import('./features/words/WordsMenu'))
const Words = lazy(() => import('./features/words/Words'))
const AddWord = lazy(() => import('./features/words/AddWord'))
const EditWord = lazy(() => import('./features/words/EditWord'))
const WordsHome = lazy(() => import("./features/words/WordsHome"))
const VerifyEmailForm = lazy(() => import("./features/users/verifyEmailForm"))
const RecoverTokenForm = lazy(() => import("./features/auth/RecoverTokenForm"))
const ResetPasswordForm = lazy(() => import("./features/auth/ResetPasswordForm"))

import Layout from './components/Layout'
import Prefetch from './features/auth/Prefetch'
import PublicLayout from './components/PublicLayout'
import RequireAuth from './features/auth/RequireAuth'
import PersistLogin from './features/auth/PersistLogin'

import Loading from './components/Loading'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<LandPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/recover_password' element={<RecoverTokenForm />} />
          <Route path='/reset_password' element={<ResetPasswordForm />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path='/verify_email' element={<VerifyEmailForm />} />
              <Route path='/home' element={<WordsHome />} />
              <Route path='/words'>
                <Route index element={<WordsMenu />} />
                <Route path=':category' element={<Words />} />
                <Route element={<Prefetch />}>
                  <Route path=':category/:id' element={<EditWord />} />
                </Route>
              </Route>
              <Route path='lessons'>
              </Route>
              <Route path='/add_word' element={<AddWord />} />
              <Route path='/about' element={<About />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
