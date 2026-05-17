import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        pendingEmail: localStorage.getItem("pendingEmailLangApp") || null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
        setPendingEmail: (state, action) => {
            const { email } = action.payload
            state.pendingEmail = email
            localStorage.setItem("pendingEmailLangApp", email)
        },
        clearPendingEmail: (state, action) => {
            state.pendingEmail = null
            localStorage.removeItem("pendingEmailLangApp")
        }
    },
})

export const { setCredentials, logOut, setPendingEmail, clearPendingEmail } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token