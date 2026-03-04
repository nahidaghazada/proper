import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./baseQuery"

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery,
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/order',
                method: 'POST',
                body: orderData
            })
        }),
        getOrders: builder.query({
            query: () => '/order'
        })
    })
})

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi