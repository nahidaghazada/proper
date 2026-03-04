import { Outlet } from "react-router"
import AdminHeader from "../components/admin/header/AdminHeader"


function AdminLayout() {
    return (
        <div>
           <AdminHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout