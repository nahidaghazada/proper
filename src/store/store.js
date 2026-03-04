import { configureStore } from "@reduxjs/toolkit"
import { productsApi } from "../services/productsApi"
import { categoriesApi } from "../services/categoriesApi"
import { authApi } from "../services/authApi"
import authReducer from "./slices/authSlice"
import { tagApi } from "../services/tagApi"
import { ordersApi } from "../services/orderApi"

const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [tagApi.reducerPath]: tagApi.reducer,
        auth: authReducer,
         [ordersApi.reducerPath]: ordersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(authApi.middleware)
            .concat(tagApi.middleware)
            .concat(ordersApi.middleware)
})

export default store