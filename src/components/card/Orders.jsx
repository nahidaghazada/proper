import { useNavigate } from "react-router"
import { useGetOrdersQuery } from "../../services/orderApi"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import Loading from "../loading/Loading"

function Orders() {
    const navigate = useNavigate()
    const { data: orders, isLoading } = useGetOrdersQuery()

    if (isLoading) return <Loading />
    if (!orders) return null

    return (
        <>
            <Header />
            <div className="max-w-5xl mx-auto px-4 py-10 flex gap-10">
                <div className="w-48 shrink-0 space-y-4">
                    <p onClick={() => navigate("/account")} className="cursor-pointer text-gray-500 hover:text-black">Account</p>
                    <p onClick={() => navigate("/account/orders")} className="cursor-pointer font-medium text-black">Orders</p>
                    <p onClick={() => navigate("/logout")} className="cursor-pointer text-gray-500 hover:text-black">Sign Out</p>
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-medium mb-6">Orders</h1>

                    {orders.length === 0 && (
                        <p className="text-gray-500">No orders yet.</p>
                    )}

                    {orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded mb-6">
                            <div className="grid grid-cols-3 px-6 py-4 text-sm border-b border-gray-200">
                                <div>
                                    <p className="text-xs text-gray-400">Order Date</p>
                                    <p className="text-gray-800 mt-1">
                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric", month: "long", day: "2-digit"
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Order Summary</p>
                                    <p className="text-gray-800 mt-1">{order.list?.length} item(s)</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Amount</p>
                                    <p className="text-gray-800 mt-1">$ {order.totalPrice}</p>
                                </div>
                            </div>

                            {order.list?.map((item, i) => (
                                <div key={i} className="flex gap-6 px-6 py-4 border-b last:border-b-0">
                                    <div className="w-24 h-28 bg-gray-50 rounded overflow-hidden">
                                        <img src={item.variant?.images?.[0]?.url} alt={item.product?.title}
                                            className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                        <p className="font-medium text-gray-800">{item.product?.title}</p>
                                        <p className="text-sm text-gray-500">Color : {item.variant?.specs?.color}</p>
                                        <p className="text-sm text-gray-500">Size : {item.variant?.specs?.size}</p>
                                        <p className="text-sm text-gray-500">$ {item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders