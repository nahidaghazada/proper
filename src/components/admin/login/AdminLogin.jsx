import { useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useLoginMutation } from "../../../services/authApi"
import { useNavigate } from "react-router"

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    login({ email, password })
      .unwrap()
      .then((res) => {
        localStorage.setItem("admin_token", res.token)
        setSuccessMessage("Login successful!")
        navigate("/admin/products")
      })
      .catch((err) => {
        setErrorMessage("Login failed!")
      })
  }

  return (
    <div className="flex items-center justify-center bg-gray-400 h-screen">
      <div className="w-full max-w-sm p-8 space-y-3 rounded-xl dark:bg-gray-300 dark:text-gray-800">
        <h1 className="text-center text-2xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block">E-mail</label>
            <input type="text"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              className="border border-black rounded-md px-4 py-2 w-full outline-none" name="email" placeholder="E-mail" id="email" value={email} />
          </div>
          <div className="relative space-y-1">
            <label htmlFor="password" className="block">Password</label>
            <input type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-md px-4 py-2 w-full outline-none" name="password" id="password" placeholder="Password" value={password} />
            <button type="button" onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-[38px] text-xl cursor-pointer">
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          <button type="submit" className="bg-gray-900 w-full text-[#fff] px-4 py-3 rounded-md text-center cursor-pointer">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin