import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./baseQuery"

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery,
    endpoints: (builder) => ({
        getComments: builder.query({
            query: ({ productId, page = 1 }) => `/comment/${productId}?page=${page}`,
            providesTags: ["Comment"]
        }),
        createComment: builder.mutation({
            query: (body) => ({
                url: "/comment",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Comment"]
        }),
    }),
})

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi