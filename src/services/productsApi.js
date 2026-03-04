import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./baseQuery"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 10, page = 1, category } = {}) => {
        let url = `/product?limit=${limit}&page=${page}`
        if (category) {
          url += `&categories=${category}`
        }
        return url
      }
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        'url': '/product',
        'method': 'POST',
        'body': productData
      })
    }),
    getProductBySlug: builder.query({
      query: (slug) => ({
        'url': `/product/slug/${slug}`,
        'method': 'GET',
      })
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data
      })
    }),
    deleteProduct: builder.mutation({
      query: ( id ) => ({
        url: `/product/${id}`,
        method: "DELETE",
      })
    }),
    addVariant: builder.mutation({
      query: ({ productId, variantData }) => ({
        url: `product/${productId}/variant`,
        method: "POST",
        body: variantData
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddVariantMutation,
  useGetProductBySlugQuery
} = productsApi