import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation({
            query: credentials => ({
                url: '/users',
                method: 'POST',
                body: { ...credentials },
                credentials: 'include'
            })
        }),

        updateUser: builder.mutation({
            query: credentials => ({
                url: '/users',
                method: 'PATCH',
                body: { ...credentials }
            })
        }),

        deleteUser: builder.mutation({
            query: credentials => ({
                url: '/users',
                method: 'DELETE',
                body: { ...credentials }
            })
        }),

        sendVerificationEmail: builder.mutation({
            query: credentials => ({
                url: '/users/verify_email',
                method: 'POST',
                body: { ...credentials }

            })
        }),

        validateEmail: builder.mutation({
            query: credentials => ({
                url: '/users/validate_user',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        deleteWords: builder.mutation({
            query: credentials => ({
                url: '/users/delete_words',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useSendVerificationEmailMutation,
    useValidateEmailMutation,
    useDeleteWordsMutation
} = usersApiSlice