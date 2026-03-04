import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useLoginMutation } from "../../services/authApi"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../store/slices/authSlice"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        try {
            const result = await login({ email, password }).unwrap()
            dispatch(setCredentials(result))
            setMessage("Login ugurludur")
            const from = location.state?.from || "/"
            navigate(from, { replace: true })
        } catch (err) {
            setMessage(err?.data?.message || "Login ugursuz oldu")
        }
    }
    return (
        <section className="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
            <div className="max-w-[600px] w-full mx-auto bg-[#ffffffb3] py-4 rounded-md">
                <div className="max-w-[400px] mx-auto">
                    <h2 className="text-center text-[#000] text-[24px] font-medium mb-4">Sign In Account</h2>
                    <p className="text-[14px] text-center text-[#999] mb-6">Sign in for a faster checkout experience and to enjoy membership privileges.</p>
                </div>
                <div className="max-w-[400px] mx-auto rounded-md p-3">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="text-[#666666] block mb-1">E-mail</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="email" name="email" autoComplete="username"
                                className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none pr-10" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="text-[#666666] block mb-1">Password</label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="username"
                                    className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none pr-10" />
                                <button type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute cursor-pointer right-3 top-[50%] -translate-y-[50%]">
                                    {showPassword ? <IoEyeOff size={18} className="text-[#000]" /> : <IoEye size={18} className="text-[#000]" />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4 flex justify-center">
                            <Link to={"/forgot-password"} className="text-[#888] hover:underline text-[12px] cursor-pointer"> Forgot password ? </Link>
                        </div>
                        <div>
                            <button type="submit" className="bg-[#000] w-full block rounded-md py-3 text-[#fff] cursor-pointer">Sign In</button>
                        </div>
                    </form>
                </div>
                <div className="py-2">
                    <p className="text-center text-[#888] text-[12px]">
                        Don't have an account yet?
                        <Link className="hover:underline" to={"/register"}> Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login