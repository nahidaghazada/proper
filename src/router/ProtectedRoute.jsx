import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("admin_token")
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) navigate("/admin/login")
    }, [token, navigate])

    if(!token) return null
    return (children)
}

export default ProtectedRoute