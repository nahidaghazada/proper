import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./baseQuery"

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery,
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => "/tag",
    }),
    createTags: builder.mutation({
      query: (data) => ({
        url: "/tag",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Tag"],
    }),
    updateTags: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tag/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Tag"],
    }),
    deleteTags: builder.mutation({
      query: (id) => ({
        url: `/tag/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Tag"],
    })
  }),
})

export const {
  useGetTagsQuery,
  useCreateTagsMutation,
  useUpdateTagsMutation,
  useDeleteTagsMutation
} = tagApi
