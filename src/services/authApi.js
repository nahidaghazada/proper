import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import ConfigObj from "../config/config"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: ConfigObj.baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),

            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem("admin_token", data.token)
                    localStorage.setItem("token", data.token)
                } catch (error) {
                    console.log("Login error:", error)
                }
            }
        }),
        register: builder.mutation({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ email }) => ({
                url: "/forget_password",
                method: "POST",
                body: { email },
            })
        }),
        confirmResetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: "/auth/confirm-reset",
                method: "POST",
                body: { token, password },
            })
        })
    }),
})

export const { useLoginMutation, useRegisterMutation, useResetPasswordMutation, useConfirmResetPasswordMutation } = authApi