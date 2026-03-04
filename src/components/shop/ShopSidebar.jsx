import { useState } from "react"
import { IoChevronForward, IoArrowBack } from "react-icons/io5"
import { useGetCategoriesQuery } from "../../services/categoriesApi"
import { FaRegUser } from "react-icons/fa6"
import { Link, useNavigate } from "react-router"
import { IoIosSearch } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/slices/authSlice"

function ShopSidebar({ onClose }) {
    const { data: categories } = useGetCategoriesQuery()
    const [currentCategory, setCurrentCategory] = useState(null)
    const [categoryPath, setCategoryPath] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const handleCategoryClick = (category) => {
        if (category.children && category.children.length > 0) {
            setCurrentCategory(category)
            setCategoryPath([...categoryPath, category])
        } else {
            const slugs = [...categoryPath.map(c => c.slug), category.slug]
            navigate(`/shop?category=${slugs.join(',')}`)
            onClose?.()
        }
    }

    const goBack = () => {
        if (categoryPath.length > 0) {
            const newPath = [...categoryPath]
            newPath.pop()
            setCategoryPath(newPath)
            setCurrentCategory(newPath[newPath.length - 1] || null)
        } else {
            setCurrentCategory(null)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)
            onClose?.()
        } else {
            navigate('/shop')
            onClose?.()
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
        onClose?.()
    }

    return (
        <div className="md:hidden">
            <div className="max-w-[400px] duration-300 w-full bg-white z-[999] md:hidden fixed top-[60px] left-0 bottom-0">
                <div className="py-4 h-full relative">
                    <div className="px-4 mb-6 relative">
                        <form onSubmit={handleSearch}>
                            <input type="text" placeholder="Search Product" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#F0F0F0] rounded-md py-3 pl-4 pr-10 text-[#030303] outline-none border-none" />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                                <IoIosSearch className="text-xl text-gray-500 mx-2" />
                            </button>
                        </form>
                    </div>
                    <div className="px-4">
                        {currentCategory && (
                            <button onClick={goBack}
                                className="cursor-pointer mb-4 gap-x-2 text-gray-500 hover:text-gray-800 flex items-center">
                                <IoArrowBack /> Back
                            </button>
                        )}
                        <ul className="space-y-3">
                            {(currentCategory ? currentCategory.children : categories)?.map(
                                (cat) => (
                                    <li key={cat._id}
                                        className="flex justify-between items-center cursor-pointer hover:text-gray-600"
                                        onClick={() => handleCategoryClick(cat)}>
                                        <span>{cat.name}</span>
                                        {cat.children && cat.children.length > 0 && (
                                            <IoChevronForward size={18} />
                                        )}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="absolute left-4 bottom-0 right-4 border-t border-[#333] py-4">
                  <div className="flex items-center justify-between">
                      {user ? (
                        <button onClick={onClose} className="flex w-full justify-between gap-2 items-center font-semibold cursor-pointer">
                            <Link className="flex items-center gap-1" to={"/account"}>
                                <FaRegUser /> Account
                            </Link>
                            <button onClick={handleLogout} className="cursor-pointer text-sm font-medium hover:underline">
                                Sign out
                            </button>
                        </button>
                    ) : (
                        <button>
                            <Link to={"/login"} onClick={onClose} className="flex gap-2 items-center uppercase font-semibold">
                                <FaRegUser /> Sign in
                            </Link>
                        </button>
                    )}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSidebar