import { useState } from "react"
import { Link } from "react-router"
import { useResetPasswordMutation } from "../../services/authApi"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    try {
      await resetPassword({ email }).unwrap()
      setMessageType("success")
      setMessage("A password reset link has been sent to your email! Check your email.")
      setEmail("")
    } catch (err) {
      setMessageType("error")
      setMessage(err?.data?.message || err?.message || "Email could not be sent.")
    }
  }

  return (
    <section className="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
      <div className="max-w-[600px] w-full mx-auto bg-[#ffffffb3] py-4 rounded-md">
        <div className="max-w-[400px] mx-auto">
          <h2 className="text-center text-[#000] text-[24px] font-medium mb-4">Reset Password</h2>
          <p className="text-[14px] text-center text-[#999] mb-6">Enter your email address and we will send you a password reset link.</p>
        </div>
        <div className="max-w-[400px] mx-auto rounded-md p-3">
          {message && (
            <div className={`mb-4 p-3 rounded-md text-center text-sm ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="text-[#666666] block mb-1">
                E-mail
              </label>
              <input type="email" id="email" name="email" value={email} required placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fff] rounded-[6px] border border-black/40 px-3 py-[6px] text-black text-[14px] outline-none" />
            </div>
            <button type="submit" disabled={isLoading}
              className="bg-[#000] w-full rounded-md py-3 text-[#fff] cursor-pointer disabled:opacity-50 flex items-center justify-center">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
        <div className="py-2">
          <p className="text-center text-[#888] text-[12px]">
            <Link className="hover:underline" to={"/login"}>
              ← Back to login page
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword