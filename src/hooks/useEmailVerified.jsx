import useAuth from "../hooks/useAuth"
import { jwtDecode } from "jwt-decode"

const useEmailVerified = () => {
    const { accessToken } = useAuth()

    if (accessToken && typeof accessToken === 'string') {
        try {
            const decoded = jwtDecode(accessToken)
            
            return { emailVerified: decoded?.UserInfo?.emailVerified }
        } catch (err) {
            console.error(err)
        }
    }

    return { emailVerified: null }
}

export default useEmailVerified