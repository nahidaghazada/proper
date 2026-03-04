import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = import.meta.env.VITE_BASE_URL

export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        headers.set('Authorization', `Bearer ${token}`)
        headers.set('Content-Type', 'application/json')

        return headers
    }
})