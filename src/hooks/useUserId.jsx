import useAuth from "../hooks/useAuth"
import { jwtDecode } from "jwt-decode"

const useUserId = () => {
    const { accessToken } = useAuth()

    if (accessToken && typeof accessToken === 'string') {
        try {
            const decoded = jwtDecode(accessToken)
            
            return { userId: decoded?.UserInfo?.id }
        } catch (err) {
            console.error(err)
        }
    }

    return { userId: null }
}

export default useUserId