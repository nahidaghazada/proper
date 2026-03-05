import { useState, useEffect, useRef } from "react"
import { IoSearchSharp } from "react-icons/io5"
import { useNavigate } from "react-router"
import { createPortal } from "react-dom"
import { useGetCategoriesQuery } from "../../services/categoriesApi"

function Search({ onClose }) {
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const elRef = useRef(document.createElement("div"))
    const { data: categories } = useGetCategoriesQuery()

    useEffect(() => {
        const el = elRef.current
        document.body.appendChild(el)
        return () => document.body.removeChild(el)
    }, [])

    const findCategorySlug = (term, items) => {
        for (const cat of items || []) {
            if (cat.name.toLowerCase() === term.toLowerCase() ||
                cat.slug.toLowerCase() === term.toLowerCase() ||
                cat.name.toLowerCase().includes(term.toLowerCase())) {
                return cat.slug
            }
            if (cat.children) {
                const found = findCategorySlug(term, cat.children)
                if (found) return found
            }
        }
        return null
    }

    const handleSearch = () => {
        const request = value.trim()
        if (!request) return

        const categorySlug = findCategorySlug(request, categories)
        if (categorySlug) {
            navigate(`/shop?category=${categorySlug}`)
        } else {
            navigate(`/shop?search=${request}`)
        }
        onClose()
        setValue("")
    }

    return createPortal(
        <div onClick={onClose} className="fixed hidden md:flex bg-[#00000080] top-[60px] left-0 right-0 bottom-0 z-[999]">
            <div onClick={(e) => e.stopPropagation()} className="flex w-full h-fit">
                <div className="md:px-8 md:w-9/12 lg:px-12 py-10 bg-[#fff]">
                    <div className="relative">
                        <input type="text" value={value} autoFocus placeholder="Search Products..."
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="block w-full px-3 py-[10px] rounded bg-[#F0F0F0] outline-none" />
                        <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                            <IoSearchSharp />
                        </button>
                    </div>
                </div>
                <div className="md:px-8 md:w-3/12 lg:px-12 py-10 bg-[#E2E2E2]">
                    <p className="font-medium text-[14px] mb-2">Trending</p>
                    <ul className="flex flex-wrap gap-1">
                        {["Shirts", "Suits", "Pants", "Sweaters"].map((item) => (
                            <li key={item}
                                className="text-[#777] text-[13px] underline cursor-pointer"
                                onClick={() => { navigate(`/shop?category=${item.toLowerCase()}`); onClose(); }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>,
        elRef.current
    )
}

export default Search