import { useState } from "react"
import { useNavigate } from "react-router"
import { FaRegBookmark, FaChevronDown } from "react-icons/fa"
import DetailSize from "./DetailSize"
import toast from "react-hot-toast"

function DetailProduct({ product, variant }) {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [isOpen, setIsOpen] = useState(false)

    const colors = product.specs.find((s) => s.key === "color")?.values || []
    const sizes = product.specs.find((s) => s.key === "size")?.values || []
    const currentVariants = product.variants.filter((v) => v.specs.color === variant.specs.color)

    const getDiscountedPrice = () => {
        if (!variant.discount) return null
        if (variant.discountType === "percentage") {
            return (variant.price - (variant.price * variant.discount) / 100).toFixed(2)
        }
        return (variant.price - variant.discount).toFixed(2)
    }

    const discountedPrice = getDiscountedPrice()

    const handleAddCart = () => {
        if (variant.stock < quantity) {
            toast.error("There are not enough products in stock.")
            return
        }

        const basket = JSON.parse(localStorage.getItem("cartItems") || "[]")

        const itemCart = basket.find(
            (item) => item.productId._id === product._id && item.variantId === variant._id
        );

        if (itemCart) {
            const totalCount = itemCart.count + quantity;
            if (totalCount > variant.stock) {
                toast.error(`Maksimum stok: ${variant.stock}. Səbətdə artıq ${itemCart.count} ədəd var.`)
                return
            }
            itemCart.count = totalCount;
        } else {
            const newItem = {
                _id: Math.random().toString(36).substr(2, 9),
                productId: {
                    _id: product._id,
                    title: product.title,
                    slug: product.slug,
                },
                variantId: variant._id,
                price: discountedPrice ? parseFloat(discountedPrice) : variant.price,
                count: quantity,
                variant: variant
            }
            basket.push(newItem)
        }

        localStorage.setItem("cartItems", JSON.stringify(basket))
        toast.success("Product added to cart");
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-[#444] text-[22px] xl:text-[32px] font-medium">{product.title}</h1>
                <button className="text-2xl hover:text-gray-600 transition">
                    <FaRegBookmark />
                </button>
            </div>
            <div className="mb-8 mt-2">
                <span className={`text-lg ${discountedPrice ? 'text-red-600 line-through mr-3' : 'text-[#555]'}`}>
                    ${variant.price}
                </span>
                {discountedPrice && <span className="text-[#555] text-lg font-bold">${discountedPrice}</span>}
            </div>
            <div className="mb-10">
                <p className="text-[#555] text-sm mb-4 uppercase font-semibold">{variant.specs.color}</p>
                <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                        <div key={c._id}
                            onClick={() => {
                                const target = product.variants.find((v) => v.specs.color === c.key)
                                navigate(`/detail/${product.slug}/${target?.slug}`)
                            }}
                            className={`w-12 h-12 border-2 p-[2px] cursor-pointer rounded-md transition ${c.key === variant.specs.color ? 'border-[#000]' : 'border-transparent hover:border-gray-300'}`}>
                            <img src={c.value} className="w-full h-full object-cover rounded" alt={c.key} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-8">
                <p className="text-[20px] mb-4 font-medium">Select your Size</p>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                        <DetailSize key={s._id} size={s} currentSize={variant.specs.size} variants={currentVariants}
                            onSelect={(sizeKey) => {
                                const target = currentVariants.find((v) => v.specs.size === sizeKey)
                                if (target) navigate(`/detail/${product.slug}/${target.slug}`)
                            }} />
                    ))}
                </div>
            </div>
            <p className="mb-2 text-[#888] text-sm">Stock in {variant.stock}</p>
            <div className="flex mb-6 gap-3">
                <button onClick={handleAddCart}
                    className="flex-1 bg-[#000] cursor-pointer text-[#fff] py-4 rounded-lg font-semibold hover:bg-gray-800 transition">
                    Add to Bag
                </button>
                <div className="w-18 relative">
                    <div onClick={() => setIsOpen(!isOpen)}
                        className="border-2 border-[#000] rounded-lg h-full flex items-center justify-between px-3 cursor-pointer font-bold ">
                        {quantity} <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isOpen && (
                        <div className="absolute bottom-full mb-1 left-0 w-full bg-[#fff] border-2 border-[#000] rounded-lg z-20 max-h-48 overflow-y-auto shadow-2xl
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {[...Array(variant.stock)].slice(0, 10).map((_, i) => (
                                <div key={i} onClick={() => { setQuantity(i + 1); setIsOpen(false) }}
                                    className="p-3 hover:bg-gray-100 text-center cursor-pointer border-b last:border-0">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="border-t pt-6">
                <h3 className="text-[#777] text-sm uppercase font-bold mb-2">Description</h3>
                <p className="text-[#666] text-[14px] leading-relaxed">{product.description}</p>
            </div>
        </div>
    )
}

export default DetailProduct