import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import { useCreateOrderMutation } from "../../services/orderApi"
import toast from "react-hot-toast"

function Card() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [createOrder, { isLoading: isOrdering }] = useCreateOrderMutation()

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]")
    setCartItems(items)
  }, [])

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateCount = (id, index) => {
    const updatedCart = cartItems
      .map(item => item._id !== id ? item : { ...item, count: item.count + index })
      .filter(item => item.count > 0)
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.count), 0)
  const shipping = cartItems.length > 0 ? 18 : 0
  const total = subtotal + shipping

  const handleCheckout = async () => {
    try {
      const orderData = {
        list: cartItems.map(item => ({
          productId: item.productId?._id,
          variantId: item.variant?._id,
          count: item.count,
        })),
      }
      await createOrder(orderData).unwrap()
      localStorage.removeItem("cartItems")
      setCartItems([])
      toast.success("Order placed successfully!")
      navigate("/account/orders")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error("Order xətası:", error)
    }
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f5f5f5]">
          <p className="text-[#757575] text-lg mb-3">Your shopping bag is empty.</p>
          <button onClick={() => navigate("/shop")} className="bg-[#000] text-[#fff] cursor-pointer px-6 py-3 uppercase text-sm rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            Back to Shop
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="bg-[#f9f9f9] min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-medium mb-8">Shopping Bag</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-[#fff] cursor-pointer border-t border-gray-100 shadow-sm">
                <div className="p-3 bg-gray-50 text-[11px] uppercase tracking-widest text-gray-500 flex justify-between">
                  <span>Custom Orders</span>
                  <span>Delivery by Mar 13 – Mar 16</span>
                </div>
                {cartItems.map((item) => (
                  <div key={item._id} className="p-6 flex gap-6 border-b last:border-b-0 relative">
                    <div className="w-32 h-40 bg-gray-100 overflow-hidden">
                      <img src={item.variant?.images?.[0]?.url} alt={item.productId?.title}
                        className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{item.productId?.title}</h3>
                      <p className="text-gray-500 text-sm mt-1 uppercase">
                        {item.variant?.specs?.size} | {item.variant?.specs?.color}
                      </p>
                      <p className="mt-4 font-medium">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button onClick={() => updateCount(item._id, -1)} className="px-3 cursor-pointer py-1 hover:bg-gray-100">-</button>
                        <span className="px-3 py-1 text-sm border-x border-gray-300">{item.count}</span>
                        <button onClick={() => updateCount(item._id, +1)} className="px-3 cursor-pointer py-1 hover:bg-gray-100">+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-xs cursor-pointer text-gray-400 hover:text-red-500 tracking-tighter">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[350px]">
              <div className="bg-[#fff] p-6 shadow-sm border border-gray-100">
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Price</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button disabled={isOrdering} onClick={handleCheckout} 
                  className="w-full bg-[#000] text-[#fff] cursor-pointer py-4 mt-6 uppercase text-sm font-bold tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isOrdering ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                      Processing...
                    </>
                  ) : (
                    <>Secure Checkout <span className="text-lg">→</span></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Card