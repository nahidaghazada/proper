import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router"
import App from "../App"
import Admin from "../components/admin/login/AdminLogin"
import AdminLayout from "../layout/AdminLayout"
import AdminProducts from "../components/admin/products/AdminProducts"
import AdminCategory from "../components/admin/category/AdminCategory"
import AdminTag from "../components/admin/tag/AdminTag"
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"
import AuthLayout from "../layout/AuthLayout"
import ProtectedRoute from "./ProtectedRoute"
import Detail from "../components/detail/Detail"
import ShopMenu from "../components/shop/ShopMenu"
import Shop from "../components/shop/Shop"
import ForgotPassword from "../components/auth/ForgotPassword"
import Account from "../components/card/Account"
import Card from "../components/card/Card"
import Orders from "../components/card/Orders"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}></Route>
            <Route path="/shopMenu" element={<ShopMenu />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="detail/:productSlug/:slug" element={<Detail />} />
            <Route path="/admin/login" element={<Admin />}></Route>
            <Route path="/admin" element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            } >
                <Route index element={
                    <Navigate to="products" replace />
                } />
                <Route path="products" element={<AdminProducts />} />
                <Route path="category" element={<AdminCategory />} />
                <Route path="tag" element={<AdminTag />} />
            </Route>

            <Route path="/login" element={
                <AuthLayout>
                    <Login />
                </AuthLayout>
            } />

            <Route path="/register" element={
                <AuthLayout>
                    <Register />
                </AuthLayout>
            } />

            <Route path="/forgot-password" element={
                <AuthLayout>
                    <ForgotPassword />
                </AuthLayout>
            } />

            <Route path="/card" element={<Card />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<Orders />} />
        </>
    )
)

export default router