import { useEffect, useState } from "react"
import { FaUserLarge } from "react-icons/fa6"
import { IoBag, IoSearchSharp } from "react-icons/io5"
import { Link, useNavigate } from "react-router"
import { getAllProducts } from "../../services/productServices"
import ShopMenu from "../shop/ShopMenu"
import ShopSidebar from "../shop/ShopSidebar"
import { useSelector } from "react-redux"
import Search from "./Search"

function Header({ onClose }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [showShopMenu, setShowShopMenu] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts()
      setProducts(response)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    document.body.style.overflow = showShopMenu ? 'hidden' : 'auto'
  }, [showShopMenu])

  useEffect(() => {
    const updateCount = () => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]")
      const total = items.length
      setCartCount(total)
    }
    updateCount()
    window.addEventListener("cartUpdated", updateCount)
    window.addEventListener("storage", updateCount)
    return () => {
      window.removeEventListener("cartUpdated", updateCount)
      window.removeEventListener("storage", updateCount)
    }
  }, [])

  const handleShopClick = (e) => {
    e.preventDefault()
    setShowShopMenu(false)
    navigate("/shop")
  }

  const handleBagClick = () => {
    const user = localStorage.getItem("user")

    if (!user) {
      navigate("/login", { state: { from: "/card" } })
    } else {
      navigate("/card")
    }
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-1000 bg-[#000] px-3 md:px-8 lg:px-12">
      <div className="flex items-center min-h-[60px]">
        <div className="w-2/12 md:hidden">
          <button onClick={() => { setSidebarOpen(!sidebarOpen) }} className="cursor-pointer">
            <span className="bg-white h-[0.5px] block duration-300 mb-1 w-7"></span>
            <span className="bg-white h-[1px] block duration-300 my-1 w-7"></span>
            <span className="bg-white h-[0.5px] block duration-300 mt-1 w-7"></span>
          </button>
        </div>
        <ul className="w-4/12 hidden text-[#fff] md:flex">
          <li className="flex items-center min-h-[60px] cursor-pointer pr-2 text-[#ccc] hover:text-[#fff]"
            onMouseEnter={() => { setShowShopMenu(true) }}
            onMouseLeave={() => { setShowShopMenu(false) }}>
            <Link to="/shop" onClick={handleShopClick}>Shop</Link>
            {showShopMenu && (
              <div className="absolute top-[60px] left-0 w-full bg-white shadow-lg p-6 transition-all duration-300"
                onMouseEnter={() => { setShowShopMenu(true) }}
                onMouseLeave={() => { setShowShopMenu(false) }}>
                <ShopMenu products={products} onClose={() => setShowShopMenu(false)} />
              </div>
            )}
          </li>
        </ul>
        <div className="flex items-center justify-center w-8/12 md:w-4/12">
          <p className="text-[#ccc] hover:text-[#fff] text-[20px]">
            <Link to="/">PROPER CLOTH</Link>
          </p>
        </div>
        <div className="flex items justify-end w-4/12 md:w-4/12 md:gap-6 lg:gap-8">
          <button className="hidden md:block"
            onClick={() => setSearchOpen(prev => !prev)} >
            <IoSearchSharp className="text-[#fff] text-[20px] cursor-pointer" />
          </button>
          {user ? (
            <Link to="/account" className="hidden md:block">
              <FaUserLarge className="text-[#fff] cursor-pointer" />
            </Link>
          ) : (
            <Link to="/login" className="hidden md:block">
              <FaUserLarge className="text-[#fff] cursor-pointer" />
            </Link>
          )}
          <button className=" flex flex-row items-center" onClick={handleBagClick}>
            <IoBag className="text-[#fff] cursor-pointer" />
            {cartCount > 0 && (
              <span className="text-[#fff] text-[14px] font-medium ml-2">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {sidebarOpen && (<ShopSidebar products={products} onClose={() => setSidebarOpen(false)} />)}
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </header>
  )
}

export default Header