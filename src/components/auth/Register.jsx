import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useRegisterMutation } from "../../services/authApi"
import { IoEye, IoEyeOff } from "react-icons/io5"

function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    try {
      await register({firstName, lastName, email, password }).unwrap()
      setMessage("Qeydiyyat ugurludur")
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setMessage(err?.data?.message || "qeydiyyat ugursuz oldu")
    }
  }

  return (
    <section className="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
      <div className="max-w-[600px] w-full mx-auto bg-[#ffffffb3] py-4 rounded-md">
        <div className="max-w-[400px] mx-auto">
          <h2 className="text-center text-[#000] text-[24px] font-medium mb-4">Create an Account</h2>
        </div>
        <div className="max-w-[400px] mx-auto rounded-md p-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="text-[#666666] block mb-1">Firstname</label>
              <input type="text" id="firstName" name="firstName" value={firstName} required
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none pr-10" />
              <label htmlFor="email" className="text-[#666666] block mb-1">Lastname</label>
              <input type="text" id="lastName" name="lastName" value={lastName} required
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none pr-10" />
              <label htmlFor="email" className="text-[#666666] block mb-1">E-mail</label>
              <input type="text" id="email" name="email" value={email} required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none pr-10" />
              <label htmlFor="password" className="text-[#666666] block mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password" value={password} required name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none pr-10" />
                <button type="button" 
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute cursor-pointer right-3 top-[50%] -translate-y-[50%]">
                   {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>
            <div>
              <button type="submit" disabled={isLoading}
                className="bg-[#000] w-full py-3 text-white rounded-md flex justify-center items-center">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                  </div>
                ) : ("Sign Up")}
              </button>
            </div>
          </form>
        </div>
        <div className="py-2">
          <p className="text-center text-[#888] text-[12px]">
            Already have an account?
            <Link className="hover:underline" to={"/login"}> Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register