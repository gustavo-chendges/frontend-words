import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Layout = () => {
  const pathName = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathName])

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 d-flex justify-content-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout