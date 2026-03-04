// import OrderItem from "./OrderItem"

import { useGetOrdersQuery } from "../../services/orderApi"
import Loading from "../loading/Loading"
import Order from "./Order"

function AccountOrder() {

 const { data: orders, isLoading } = useGetOrdersQuery()

    if (isLoading) return <Loading />
    if (!orders) return null

    return (
        <div>
            <h2 className="text-[26px] font-medium mb-6">Orders</h2>
            {orders.length === 0 ? (
                <p className="text-[#999] text-[14px]">Sifariş yoxdur.</p>
            ) : (
                orders.map((order) => (
                    <Order key={order._id} item={order} />
                ))
            )}
        </div>
    )
}

export default AccountOrder