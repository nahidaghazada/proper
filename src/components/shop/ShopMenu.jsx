import { IoIosSearch } from "react-icons/io"
import { useGetCategoriesQuery } from "../../services/categoriesApi"
import { Link, useNavigate } from "react-router"
import { useState } from "react"

function ShopMenu({ onClose }) {
  const { data: categories } = useGetCategoriesQuery()
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const findCategorySlug = (term, items) => {
    for (const cat of items || []) {
      if (cat.name.toLowerCase().includes(term.toLowerCase()) ||
        cat.slug.toLowerCase().includes(term.toLowerCase())) {
        return cat.slug
      }
      if (cat.children) {
        const found = findCategorySlug(term, cat.children)
        if (found) return found
      }
    }
    return null
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const term = searchTerm.trim()
    if (!term) return

    const categorySlug = findCategorySlug(term, categories)
    if (categorySlug) {
      navigate(`/shop?category=${categorySlug}`)
    } else {
      navigate(`/shop?search=${term}`)
    }
    setSearchTerm("")
    onClose?.()
  }

  return (
    <>
      <div className="px-4">
        <form onSubmit={handleSearch} className="relative w-full mb-8">
          <input type="text" autoComplete="on" placeholder="Search Product"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-400/70 rounded-md py-3 pl-4 pr-10 text-[#030303] outline-none border-none" />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
            <IoIosSearch className="h-5 w-5 text-[#000]" />
          </button>
        </form>
      </div>
      <div className="flex flex-wrap px-4">
        {categories?.map((cat) => (
          <div key={cat._id} className="w-1/4 mb-10 px-2">
            <h3 className="font-semibold text-[#000] mb-2 text-lg">{cat.name}</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {cat.children?.map((child) => (
                <li key={child._id} className="hover:underline hover:text-gray-600 cursor-pointer">
                  <Link onClick={onClose} to={`/shop?category=${cat.slug},${child.slug}`}>
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default ShopMenu