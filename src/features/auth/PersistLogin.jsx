import { Outlet, Link } from "react-router-dom"
import { selectCurrentToken } from "./authSlice"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useRefreshMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import usePersist from "../../hooks/usePersist"
import Loading from "../../components/Loading"
import Error from "../../components/Error"

const PersistLogin = () => {
    const navigate = useNavigate()

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [persistSuccess, setPersistSuccess] = useState(false)

    const [refresh,
        {
            isUninitialized,
            isLoading,
            isSuccess,
            isError,
            error
        }
    ] = useRefreshMutation()

    useEffect(() => {
        const persistRefresh = async () => {

            try {
                await refresh()

                setPersistSuccess(true)
            } catch (err) {
                console.error(err)
            }
        }

        if (persist && !token) persistRefresh()

    }, [])

    useEffect(() => {
        if (isError) {
            navigate({ pathname: '/', replace: true })
        }
    }, [isError, navigate])

    let content

    if (!persist) {
        content = <Outlet />
    } else if (isLoading) {
        content = <Loading />
    } else if (isError) {
        content =
            <Error error={error}>
                <Link to="/login">Please, login again</Link>
            </Error>

    } else if (isSuccess && persistSuccess) {
        content = <Outlet />
    } else if (token && isUninitialized) {
        content = <Outlet />
    }

    return content
}

export default PersistLogin