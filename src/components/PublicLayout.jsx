import { Outlet } from "react-router-dom"
import PublicFooter from "./PublicFooter"
import PublicHeader from "./PublicHeader"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const PublicLayout = () => {

  const pathName = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathName])

  return (
    <>
      <PublicHeader />
      <main className="w-100" style={{backgroundColor: "white"}}>
        <Outlet />
      </main>
      <PublicFooter />
    </>
  )
}

export default PublicLayout