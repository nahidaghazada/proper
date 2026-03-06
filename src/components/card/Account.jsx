import { useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/slices/authSlice"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import AccountDetails from "./AccountDetails"
import AccountOrder from "./AccountOrder"

function Account() {
    const [tab, setTab] = useState("account")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <>
            <Header />
            <main className="min-h-screen px-3 md:px-8 lg:px-12 py-10">
                <div className="flex gap-4 mb-6 md:hidden text-[14px] text-[#555] border-b border-[#e2e2e2] pb-4">
                    <button onClick={() => setTab("account")} className={`cursor-pointer hover:text-black transition ${tab === "account" ? "text-black font-medium" : ""}`}>Account</button>
                    <button onClick={() => setTab("orders")} className={`cursor-pointer hover:text-black transition ${tab === "orders" ? "text-black font-medium" : ""}`}>Orders</button>
                    <button onClick={handleLogout} className="cursor-pointer hover:text-black transition ml-auto">Sign Out</button>
                </div>
                <div className="flex gap-10">
                    <div className="hidden md:block w-[180px] shrink-0">
                        <ul className="space-y-4 text-[#555] text-[15px]">
                            <li><button onClick={() => setTab("account")} className={`cursor-pointer hover:text-black transition ${tab === "account" ? "text-black font-medium" : ""}`}>Account</button></li>
                            <li><button onClick={() => setTab("orders")} className={`cursor-pointer hover:text-black transition ${tab === "orders" ? "text-black font-medium" : ""}`}>Orders</button></li>
                            <li><button onClick={handleLogout} className="cursor-pointer hover:text-black transition">Sign Out</button></li>
                        </ul>
                    </div>
                    <div className="flex-1 min-w-0 md:border-l md:border-[#e2e2e2] md:pl-10">
                        {tab === "account" && <AccountDetails user={user} />}
                        {tab === "orders" && <AccountOrder />}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Account