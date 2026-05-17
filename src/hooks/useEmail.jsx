import useAuth from "../hooks/useAuth"
import { jwtDecode } from "jwt-decode"

const useEmail = () => {
    const { accessToken } = useAuth()

    if (accessToken && typeof accessToken === 'string') {
        try {
            const decoded = jwtDecode(accessToken)
            
            return { email: decoded?.UserInfo?.email }
        } catch (err) {
            console.error(err)
        }
    }

    return { email: null }
}

export default useEmail