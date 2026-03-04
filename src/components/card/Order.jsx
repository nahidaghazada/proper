import { useSelector } from "react-redux"
import { Link } from "react-router"

function OrderList({ list }) {
    return (
        <div className="border border-[#e2e2e2] p-3 mb-4 rounded">
            <div className="flex gap-3">
                <Link to={`/detail/${list.product.slug}/${list.variant.slug}`} className="w-[100px] block shrink-0">
                    <img className="w-full h-full object-cover" src={list.variant.images[0]?.url} alt="" />
                </Link>
                <div>
                    <p className="text-[#444] text-[16px]">{list.product.title}</p>
                    <span className="block text-[#757575] text-[14px]">Color: {list.variant.specs.color}</span>
                    <span className="block text-[#757575] text-[14px]">Size: {list.variant.specs.size}</span>
                </div>
            </div>
        </div>
    )
}

function Order({ item }) {
    const { user } = useSelector((state) => state.auth)

    const getDate = () => {
        const date = new Date(item.createdAt)
        return date.toLocaleString("en-EN", { day: "2-digit", month: "long", year: "numeric" })
    }

    const getSummary = () => {
        return item.list.reduce((acc, cur) => acc + cur.count, 0)
    }

    const username = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : ""

    return (
        <div className="border mb-6 border-[#e2e2e2] rounded">
            <div className="bg-[#FAFAFA] p-3">
                <div className="flex flex-wrap items-center">
                    <div className="w-6/12 sm:w-4/12 md:w-3/12 flex flex-col">
                        <p className="text-[14px] text-[#757575]">Order Date</p>
                        <span className="text-[12px] text-[#555]">{getDate()}</span>
                    </div>
                    <div className="w-3/12 hidden md:flex flex-col">
                        <p className="text-[14px] text-[#757575]">Order Summary</p>
                        <span className="text-[12px] text-[#555]">{getSummary()}</span>
                    </div>
                    <div className="hidden sm:w-4/12 md:w-3/12 sm:flex flex-col">
                        <p className="text-[14px] text-[#757575]">Buyer</p>
                        <span className="text-[12px] text-[#555]">{username}</span>
                    </div>
                    <div className="w-6/12 sm:w-4/12 md:w-3/12 flex flex-col">
                        <p className="text-[14px] text-[#757575]">Amount</p>
                        <span className="text-[12px] text-[#555]">$ {item.totalPrice - item.totalDiscount}</span>
                    </div>
                </div>
            </div>
            <div className="p-3">
                {item.list?.map((list) => (
                    <OrderList key={list._id} list={list} />
                ))}
            </div>
        </div>
    )
}

export default Order